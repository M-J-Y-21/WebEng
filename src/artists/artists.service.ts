import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ArtistSummary } from './interfaces/artist-summary.interface';
import { Artist } from './interfaces/artist.interface';
import * as _ from 'lodash';
const prisma = new PrismaClient();

@Injectable()
export class ArtistsService {

  private async getArtistsByIdName(id: string, name: string) {
    const where = id ? { id } : { name };
    return await prisma.artist.findMany({ where });
  }

  // REQ 3 Get
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

  // REQ 3 Delete
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

  // REQ 4
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
          (a, b) => a.release_date.getTime() - b.release_date.getTime())[0];
        const latestRelease = artistSongs.sort(
          (a, b) => b.release_date.getTime() - a.release_date.getTime())[0];
        const highestPopularity = artistSongs.sort(
          (a, b) => b.popularity - a.popularity)[0];

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

  // Assignment M1 Req Point 6
  async getTopArtists(year: number, limit: number, batch: number): Promise<Artist[]> {

    // get all songs released by all artists in a given year
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    
    const songs = await prisma.song.findMany({
      where: {
        release_date: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    // group songs by artist
    const songsByArtist = _.groupBy(songs, (song) => _.flatten(song.artist_ids));

    // calculate mean popularity for each artist
    const artistPopularities = _.map(songsByArtist, (songs, artistId) => {
      const popularitySum = _.sumBy(songs, 'popularity');
      const numSongs = songs.length;
      const popularity = numSongs > 0 ? popularitySum / numSongs : 0;
      return { artistId, popularity };
    });

    // sort artist popularities in descending order
    const sortedArtistPopularities = _.sortBy(artistPopularities, 'popularity').reverse();
    
    // limit number of artists
    const start = batch * limit;
    const topArtists = _.slice(sortedArtistPopularities, start, start + limit);

    // get artists from the database
    const artists = await prisma.artist.findMany({
      where: {
        id: {
          in: _.map(sortedArtistPopularities, 'artistId')
        }
      },
      take: limit ? limit : undefined,
      skip: batch ? batch * limit : undefined
    });

    return artists;
  }
}
