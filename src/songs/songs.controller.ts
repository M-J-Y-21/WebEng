import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Put, Query } from '@nestjs/common/decorators';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }

  // REQ 1
  @Get(':id')
  async getSongById(@Param('id') id: string) {
    return await this.songsService.getSongById(id);
  }

  // REQ 1
  @Post('')
  async createSong(@Body() createSongDto: CreateSongDto) {
    return this.songsService.createSong(createSongDto);
  }

  // REQ 1
  @Put(':id')
  async updateSongById(@Param('id') id, @Body() updateSongDto: UpdateSongDto) {
    return await this.songsService.updateSongById(id, updateSongDto);
  }

  // REQ 1
  @Delete(':id')
  async deleteSongById(@Param('id') id: string) {
    return await this.songsService.deleteSongById(id);
  }

  // REQ 2
  @Get('')
  async retrieveSongs(
    @Query('title') name: string,
    @Query('year') year: number,
    @Query('limit') limit: number,
    @Query('content-type') contentType: string,
  ) {
    console.log(name + ", " + year + ", " + limit + ", " + contentType);
    return await this.songsService.retrieveSongs(name, year, limit, contentType);
  }
}
