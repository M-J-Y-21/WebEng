import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ArtistsService {

  private async getArtistsByIdName(id: string, name: string) {
    const where = id ? { id } : { name };
    return await prisma.artist.findMany({ where });
  }

  async getSummary(id: string, name: string) {
    // first, get all artists with the given id or name
    const artists = await this.getArtistsByIdName(id, name);

    // Calculate summary information for each artist
    const summaries = await Promise.all(
      artists.map(async (artist) => {
        // Get all songs for the artist
        const artistSongs = await this.getTopSongsByArtist(id, name, undefined, undefined);

        // Calculate summary information for the artist's songs
        const numSongs = artistSongs.length;
        const earliestRelease = artistSongs.sort(
          (a, b) => a.release_date.getTime() - b.release_date.getTime())[0];
        const latestRelease = artistSongs.sort(
          (a, b) => b.release_date.getTime() - a.release_date.getTime())[0];
        const highestPopularity = artistSongs.sort(
          (a, b) => b.popularity - a.popularity)[0];

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

  // REQ 6
  /**
   * Returns the top songs from the artist with the given id or name.
   * @param id
   * @param name
   * @param year
   * @param limit
   * @returns Songs by the artist, sorted by popularity, with the given limit.
   */
  async getTopSongsByArtist(
    id: string,
    name: string,
    year: number,
    limit: number
  ) {

    // first, get all artists with the given id or name
    const artists = await this.getArtistsByIdName(id, name);

    // get all songs where at least one artist_id is in the list of artists
    return await prisma.song.findMany({
      where: {
        artist_ids: {
          hasSome: artists.map((artist) => artist.id)
        },
        release_date: {
          ...(year ? {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`)
          } : {})
        }
      },
      take: (limit ? limit : undefined),
      orderBy: { popularity: 'desc' }
    });
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
}
