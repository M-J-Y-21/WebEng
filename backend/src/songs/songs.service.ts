import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Songs Service
 * This service is responsible for handling all the business logic for the songs
 * It is used by the songs controller to handle all the requests
 * References to requirements are included in the comments as REQ X
 */
@Injectable()
export class SongsService {
  /**
   * REQ 1 Get Portion
   * Get song by ID
   * @param id ID of the song to retrieve
   */
  async getSongById(id: string) {
    return await prisma.song.findUnique({ where: { id } });
  }

  /**
   * REQ 1 Create Portion
   * Create a song with the given data
   * @param createSongDto Data to create the song with
   */
  async createSong(createSongDto: CreateSongDto) {
    return await prisma.song.create({
      data: {
        id: createSongDto.id,
        title: createSongDto.title,
        artist_ids: createSongDto.artist_ids,
        popularity: createSongDto.popularity,
        release_date: createSongDto.release_date
      }
    });
  }

  /**
   * REQ 1 Update Portion
   * Update a song with the given data
   * @param id ID of the song to update
   * @param updateSongDto Data to update the song with
   */
  async updateSongById(id: string, updateSongDto: UpdateSongDto) {
    return await prisma.song.update({
      where: { id },
      data: {
        title: updateSongDto.title,
        artist_ids: updateSongDto.artist_ids,
        popularity: updateSongDto.popularity,
        release_date: updateSongDto.release_date
      }
    });
  }

  /**
   * REQ 1 Delete Portion
   * Delete a song with the given ID
   * @param id ID of the song to delete
   */
  async deleteSongById(id: string) {
    return await prisma.song.delete({ where: { id } });
  }

  /**
   * REQ 2 Get Portion
   * Retrieve all songs with a given name, or none if there is no song with
   * this name or no name was provided
   * REQ 5 Get Portion
   * Retrieve a list of the top N, N > 1 songs by popularity for a given year,
   * returned in batches of M = {10, 20, 50, 100}
   */
  async retrieveSongs(
    title: string,
    year: number,
    limit: number,
    skip: number
  ) {
    if (!title && isNaN(year)) {
      return [];
    }

    const songs = await prisma.song.findMany({
      where: {
        title: title,
        release_date: {
          ...(year
            ? {
                gte: new Date(`${year}-01-01T00:00:00.000Z`),
                lte: new Date(`${year}-12-31T23:59:59.999Z`)
              }
            : {})
        }
      },
      take: limit ? limit : undefined,
      skip: skip ? skip : undefined,
      orderBy: { popularity: 'desc' }
    });

    return songs;
  }
}
