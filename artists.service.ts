import { Injectable } from '@nestjs/common';
import { PrismaClient, Artist, Song } from '@prisma/client';
import * as _ from 'lodash';
const prisma = new PrismaClient();

@Injectable()
export class ArtistsService {

  private async getArtistsByIdName(id: string, name: string) {
    const where = id ? { id } : { name };
    return await prisma.artist.findMany({ where });
  }

  async getSummary(id?: string, name?: string) {
    const where = id ? { id } : { name };

    const artists = await prisma.artist.findMany({ where });
    if (artists.length === 0) {
      throw new Error('Artist not found');
    }

    // Calculate summary information for each artist
    const summaries = await Promise.all(
      artists.map(async (artist) => {
        // Get all songs for the artist
        const artistSongs = await this.getSongsByArtist(artist.id);

        // Calculate summary information for the artist's songs
        const numSongs = artistSongs.length;
        const earliestRelease = artistSongs.sort((a, b) => a.release_date.getTime() - b.release_date.getTime())[0];
        const latestRelease = artistSongs.sort((a, b) => b.release_date.getTime() - a.release_date.getTime())[0];
        const highestPopularity = artistSongs.sort((a, b) => b.popularity - a.popularity)[0];

        return {
          artist,
          numSongs,
          earliestRelease,
          latestRelease,
          highestPopularity
        };
      })
    );

    return summaries;
  }

  // REQ 3
  async deleteSongsByArtist(
    id: string,
    name: string
  ) {

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

  // Assignment M1 Req Point 6
  async getTopArtists(year: number, n: number, m: number): Promise<Artist[]> {
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
    const songsByArtist = _.groupBy(songs, (song) => _.flatten(song.artist_ids));

    const artistPopularities = _.map(songsByArtist, (songs, artistId) => {
      const popularitySum = _.sumBy(songs, 'popularity');
      const numSongs = songs.length;
      const popularity = numSongs > 0 ? popularitySum / numSongs : 0;
      return { artistId, popularity };
    });

    // Sort artist popularities in descending order
    const sortedArtistPopularities = _.sortBy(artistPopularities, 'popularity').reverse();

    // Retrieve top N artists, why does this splice function not work?
    // doesn't return n artists when used in the following where clause
    const topArtists = _.slice(sortedArtistPopularities, m, m + n);

    // Retrieve artist documents from the database
    const artists = await prisma.artist.findMany({
      where: {
        id: {
          in: _.map(sortedArtistPopularities, 'artistId')
        }
      },
      skip: m,
      take: n
    });

    return artists;
  }

  /**
   * Req 3 Retrieval
   * In first part of function we assume that the idOrName is an id.
   * If it is not an id, we assume it is a name.
   * @param idOrName
   * @returns
   */
  async getSongsByArtist(idOrName: string): Promise<Song[]> {
    let songs: Song[] = [];
    const songsById = await prisma.song.findMany({
      where: {
        artist_ids: {
          has: idOrName
        }
      }
    });
    if (songsById.length > 0) {
      return songsById;
    }
    /**
     * If the idOrName is not an id, it is a name.
     * Return songs of all artists with matching name.
     */
    const idArtistByName = await prisma.artist.findMany({
      where: {
        name: idOrName
      }
    });
    if (idArtistByName.length > 0) {
      const artistIds = idArtistByName.map((artist) => artist.id).map((id) => id.toString());

      for (let index = 0; index < artistIds.length; index++) {
        songs = songs.concat(
          await prisma.song.findMany({
            where: {
              artist_ids: { has: artistIds[index] },
              title: { notIn: songs.map((song) => song.title) }
            }
          })
        );
      }
      return songs;
    }
    // Should probably add here in case somebody enters a song not in db!
  }
}
