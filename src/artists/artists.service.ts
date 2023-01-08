import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ArtistSummary } from './interfaces/artist-summary.interface';
import { Artist } from './interfaces/artist.interface';
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

  // REQ 6
  // calculate mean popularity of all songs for an artist in <year>
  // sort this list by popularity
  // return <limit> results
  async getTopArtists(year: number, limit: number) {

    // get all artists
    const artists = await prisma.artist.findMany();

    // for every artist
    let artistPopularity = await Promise.all(
      artists.map(async (artist) => {
        // get all songs from <year>
        const artistSongs = await prisma.song.findMany({
          where: {
            artist_ids: {
              has: artist.id
            },
            release_date: {
              ...(year ? {
                gte: new Date(`${year}-01-01T00:00:00.000Z`),
                lte: new Date(`${year}-12-31T23:59:59.999Z`)
              } : {})
            }
          }
        });
        
        // calculate mean popularity of their songs that year
        let sum = 0;
        let numSongs = artistSongs.length;
        artistSongs.forEach((song) => {
          sum += song.popularity;
        });
        const meanPop = numSongs > 0 ? sum / numSongs : 0;

        return {
          artist: artist,
          popularity: meanPop
        }
      })
    );

    // sort by popularity, descending
    artistPopularity.sort((a, b) => b.popularity - a.popularity)
    // filter out artists with 0 popularity
    artistPopularity = artistPopularity.filter((artist) => artist.popularity > 0);
    
    // return top <limit> results
    return limit ? artistPopularity.slice(0, limit) : artistPopularity;
  }
}
