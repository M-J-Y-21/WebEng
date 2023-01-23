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
import { Headers, Put, Query } from '@nestjs/common/decorators';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';
import { parse } from 'json2csv';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  private sendResponse(res, accept: string, data: any) {
    if (accept == 'text/csv') {
      res.header('Content-Type', 'text/csv');
      res.send(parse(data));
    } else {
      res.send(data);
    }
  }

  // REQ 1 Retrieve
  @Get(':id')
  async getSongById(
    @Param('id') id: string,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    const song = await this.songsService.getSongById(id);
    this.sendResponse(res, accept, song);
  }

  // REQ 1 Create
  @Post('')
  async createSong(
    @Body() createSongDto: CreateSongDto /* | CreateSongCsvDto */,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    // try catch
    const song = await this.songsService.createSong(createSongDto);
    this.sendResponse(res, accept, song);
  }

  // REQ 1 Update
  @Put(':id')
  async updateSongById(
    @Param('id') id: string,
    @Body() updateSongDto: UpdateSongDto,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    const updatedSong = await this.songsService.updateSongById(
      id,
      updateSongDto
    );
    this.sendResponse(res, accept, updatedSong);
  }

  // REQ 1 Delete
  @Delete(':id')
  async deleteSongById(
    @Param('id') id: string,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    const song = await this.songsService.deleteSongById(id);
    this.sendResponse(res, accept, song);
  }

  // REQ 2, 5
  @Get('')
  async retrieveSongs(
    @Query('title') name: string,
    @Query('year') year: number,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    const songs = await this.songsService.retrieveSongs(
      name,
      year,
      limit,
      skip
    );
    this.sendResponse(res, accept, songs);
  }
}
