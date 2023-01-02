import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
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
  }
}