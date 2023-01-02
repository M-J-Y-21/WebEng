import { Injectable, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SongsService {
  private prisma = new PrismaClient();

  async getTopSongs(year: number, n: number, m: number) {
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);
    const songs = await this.prisma.song.findMany({
      where: {
        release_date: {
          gte: startDate,
          lte: endDate
        }
      },
      take: n,
      skip: m,
      orderBy: { popularity: 'desc' }
    });
    return songs;
  }

  private songs: Song[] = [
    { year: 2021, title: '24K Magic' },
    { year: 2021, title: 'Blinding Lights' },
    { year: 2021, title: 'Dynamite' },
    { year: 2020, title: 'The Box' },
    { year: 2020, title: 'Savage' },
    { year: 2020, title: 'Rockstar' },
    { year: 2020, title: 'Toosie Slide' }
  ];

  create(createSongDto: CreateSongDto) {
    const newSong = { ...createSongDto };

    this.songs.push(newSong);

    return newSong;
  }

  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'content-type', required: false })
  findAll(title?: string, year?: number, limit?: number, contentType?: string): Song[] {
    let selectedSongs = this.songs;

    console.log('In the service');

    if (title != '') {
      selectedSongs = selectedSongs.filter((song) => song.title === title);
      console.log(selectedSongs);
      console.log(title);
      console.log('Found a title');
    }

    if (year != 0) {
      selectedSongs = selectedSongs.filter((song) => song.year === year);
      console.log('Found a year');
    }

    if (limit != 0) {
      selectedSongs = selectedSongs.slice(0, limit);
      console.log('Found a limit');
    }

    if (contentType != '') {
      selectedSongs = selectedSongs.filter((song) => song.title.includes(contentType));
      console.log('Found a content-type');
    }

    return this.songs;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
