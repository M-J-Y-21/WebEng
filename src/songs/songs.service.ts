import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SongsService {
  private prisma = new PrismaService();

  async retrieveSongs(
    title: string,
    year: number,
    limit: number,
    contentType: string
  ) {
    const songs = await this.prisma.song.findMany({
      where: {
        title: title,
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

    return songs;
  }

  async createSong(createSongDto: CreateSongDto) {
    return await this.prisma.song.create({
      data: {
        title: createSongDto.title,
        artist_ids: createSongDto.artist_ids,
        popularity: createSongDto.popularity,
        release_date: createSongDto.release_date,
      }
    });
  }

  async updateSongById(id: string, updateSongDto: UpdateSongDto) {
    return await this.prisma.song.update({
      where: { id },
      data: updateSongDto
    });
  }

  async getSongById(id: string) {
    return await this.prisma.song.findUnique({ where: { id: id } });
  }

  async deleteSongById(id: string) {
    return await this.prisma.song.delete({ where: { id: id } });
  }
}
