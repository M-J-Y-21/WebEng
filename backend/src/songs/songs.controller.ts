import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Header, Headers, Put, Query } from '@nestjs/common/decorators';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';
import { parse } from 'json2csv';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  private sendResponse(res, contentType, data) {
    if (contentType == 'text/csv') {
      res.send(parse(data));
    } else {
      res.send(data);
    }
  }

  // REQ 1 Retrieve
  @Get(':id')
  async getSongById(
    @Param('id') id: string,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const song = await this.songsService.getSongById(id);
    this.sendResponse(res, contentType, song);
  }

  // REQ 1 Create
  @Post('')
  async createSong(
    @Body() createSongDto: CreateSongDto,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const song = await this.songsService.createSong(createSongDto);
    this.sendResponse(res, contentType, song);
  }

  // REQ 1 Update
  @Put(':id')
  async updateSongById(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const updatedSong = await this.songsService.updateSongById(
      id,
      updateSongDto
    );
    this.sendResponse(res, contentType, updatedSong);
  }

  // REQ 1 Delete
  @Delete(':id')
  async deleteSongById(
    @Param('id') id: string,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const song = await this.songsService.deleteSongById(id);
    this.sendResponse(res, contentType, song);
  }

  // REQ 2, 5
  @Get('')
  @Header('Access-Control-Allow-Origin', 'http://localhost:3001')
  async retrieveSongs(
    @Query('title') name: string,
    @Query('year') year: number,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const songs = await this.songsService.retrieveSongs(
      name,
      year,
      limit,
      skip
    );
    this.sendResponse(res, contentType, songs);
  }
}
