import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
import { ArtistSummary, Artist } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import * as _ from 'lodash';
const prisma = new PrismaClient();

@Injectable()
export class ArtistsService {
  /**
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
          has: idOrName,
        },
      },
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
        name: idOrName,
      },
    });
    if (idArtistByName.length > 0) {
      const artistIds = idArtistByName
        .map((artist) => artist.id)
        .map((id) => id.toString());

      for (let index = 0; index < artistIds.length; index++) {
        songs = songs.concat(
          await prisma.song.findMany({
            where: {
              artist_ids: { has: artistIds[index] },
              name: { notIn: songs.map((song) => song.name) },
            },
          }),
        );
      }
      return songs;
    }
    // Should probably add here in case somebody enters a song not in db!
  }

  async deleteSongsByArtist(idOrName: string) {
    // Count the number of songs before the delete operation
    const beforeCount = await prisma.song.count({
      where: {
        artist_ids: {
          has: idOrName,
        },
      },
    });
    // Delete all songs of artist given an artist Id
    await prisma.song.deleteMany({
      where: {
        artist_ids: {
          has: idOrName,
        },
      },
    });
    // Count the number of songs after the delete operation
    const afterCount = await prisma.song.count({
      where: {
        artist_ids: {
          has: idOrName,
        },
      },
    });
    if (beforeCount > afterCount) {
      return 'Songs with id: ' + idOrName + ' deleted successfully';
    }

    /**
     * If the idOrName is not an id, it is a name.
     * Convert name of artist to aritst id
     * Then delete by artist id like done above
     */
    const idArtistByName = await prisma.artist.findMany({
      where: {
        name: idOrName,
      },
    });
    if (idArtistByName.length > 0) {
      const artistIds = idArtistByName
        .map((artist) => artist.id)
        .map((id) => id.toString());

      await prisma.song.deleteMany({
        where: {
          artist_ids: {
            hasSome: artistIds,
          },
        },
      });
      return 'Songs with name: ' + idOrName + ' deleted successfully';
    }
    return 'No songs with id or name: ' + idOrName + ' found';
  }
  
  async getSummary(
    id: string,
    name: string,
    contentType: string,
  ): Promise<ArtistSummary[]> {
    let artists = await prisma.artist.findMany({
      where: {
        id: id,
      },
    });
    
    if (artists.length == 0) {
      artists = await prisma.artist.findMany({
        where: {
          name: name,
        },
      });
    }
    
    let summaries: ArtistSummary[];
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      summaries[i] = new ArtistSummary(artist);
    }
    
    return summaries;
    // is this right?
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
      take: n,
    });

    return artists;
  }
}
