import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class SongsService {
  // REQ 1 Retrieve
  async getSongById(id: string) {
    return await prisma.song.findUnique({ where: { id } });
  }

  // REQ 1 Create
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

  // REQ 1 Update
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

  // REQ 1 Delete
  async deleteSongById(id: string) {
    return await prisma.song.delete({ where: { id } });
  }

  // REQ 2, 5
  async retrieveSongs(
    title: string,
    year: number,
    limit: number,
    skip: number
  ) {
    const songs = await prisma.song.findMany({
      where: {
        title: { contains: title },
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
