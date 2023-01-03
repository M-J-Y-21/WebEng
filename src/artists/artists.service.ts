import { Injectable } from '@nestjs/common';
import { Song } from '../songs/entities/song.entity';
import { ArtistSummary } from './entities/artist-summary.entity';
import { PrismaClient } from '@prisma/client';
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
  ): Promise<ArtistSummary> {
    let artist = await prisma.artist.findUnique({
      where: {
        id: id,
      },
    });
    
    if (!artist) {
      artist = await prisma.artist.findUnique({
        where: {
          name: name,
        },
      });
    }
    
    return new ArtistSummary(artist, contentType);
    // is this right?
  }
}
