import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ArtistSummary } from './interfaces/artist-summary.interface';
import { Artist } from './interfaces/artist.interface';
import * as _ from 'lodash';
const prisma = new PrismaClient();

/**
 * Artists Service
 * This service is responsible for handling all business logic related to artists.
 * It is used by the artists controller to handle requests
 * References to requirements are included in the comments as REQ X
 */
@Injectable()
export class ArtistsService {
  // Helper function to get artists by id or name
  private async getArtistsByIdName(id: string, name: string) {
    if (!id && !name) {
      return [];
    }
    const where = id ? { id } : { name };
    return await prisma.artist.findMany({ where });
  }

  /**
   * REQ 3 Get Portion
   * Get all songs by an artist
   * @param id ID of the artist
   * @param name Name of the artist
   */
  async getSongsByArtist(id: string, name: string) {
    // first, get all artists with the given id or name
    const artists = await this.getArtistsByIdName(id, name);

    // get all songs where at least one artist_id is in the list of artists
    return await prisma.song.findMany({
      where: {
        artist_ids: {
          hasSome: artists.map((artist) => artist.id)
        }
      }
    });
  }

  /**
   * REQ 3 Delete Portion
   * Delete all songs by an artist
   * @param id ID of the artist
   * @param name Name of the artist
   */
  async deleteSongsByArtist(id: string, name: string) {
    // first, get all artists with the given id or name
    const artists = await this.getArtistsByIdName(id, name);

    // delete all songs where at least one artist_id is in the list of artists
    return await prisma.song.deleteMany({
      where: {
        artist_ids: {
          hasSome: artists.map((artist) => artist.id)
        }
      }
    });
  }

  /**
   * REQ 4
   * Get summary of an artist
   * @param id ID of the artist
   * @param name Name of the artist
   */
  async getSummary(id: string, name: string): Promise<ArtistSummary[]> {
    // first, get all artists with the given id or name
    const artists = await this.getArtistsByIdName(id, name);

    // Calculate summary information for each artist
    const summaries = await Promise.all(
      artists.map(async (artist): Promise<ArtistSummary> => {
        // Get all songs for the artist
        const artistSongs = await this.getSongsByArtist(id, name);

        // Calculate summary information for the artist's songs
        const numSongs = artistSongs.length;
        const earliestRelease = artistSongs.sort(
          (a, b) => a.release_date.getTime() - b.release_date.getTime()
        )[0];
        const latestRelease = artistSongs.sort(
          (a, b) => b.release_date.getTime() - a.release_date.getTime()
        )[0];
        const highestPopularity = artistSongs.sort(
          (a, b) => b.popularity - a.popularity
        )[0];

        return {
          artist: artist,
          numSongs: numSongs,
          earliestSong: earliestRelease,
          latestSong: latestRelease,
          mostPopularSong: highestPopularity
        };
      })
    );

    return summaries;
  }

  /**
   * REQ 6
   * Get top artists for a given year
   * Calculate mean popularity of all songs for an artist in <year>
   * Sort this list by popularity
   * @param year Year to get top artists from
   * @param limit Number of results to return
   * @param skip Number of results to skip
   */
  async getTopArtists(
    year: number,
    limit: number,
    skip: number
  ): Promise<Artist[]> {
    if (isNaN(year)) return [];

    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    // Retrieve all songs released by all artists in a given year
    const songs = await prisma.song.findMany({
      where: {
        release_date: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // Group songs by artist
    const songsByArtist = _.groupBy(songs, (song) =>
      _.flatten(song.artist_ids)
    );

    // Calculate mean popularity for each artist
    const artistPopularities = _.map(songsByArtist, (songs, artistId) => {
      const popularitySum = _.sumBy(songs, 'popularity');
      const numSongs = songs.length;
      const popularity = numSongs > 0 ? popularitySum / numSongs : 0;
      return { artistId, popularity };
    });

    // Sort artist popularities in descending order
    const sortedArtistPopularities = _.sortBy(
      artistPopularities,
      'popularity'
    ).reverse();

    // Retrieve artist documents from the database
    const artists = await prisma.artist.findMany({
      where: {
        id: {
          in: _.map(sortedArtistPopularities, 'artistId')
        }
      },
      take: limit ? limit : undefined,
      skip: skip ? skip : undefined
    });

    return artists;
  }
}
