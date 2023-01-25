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

/**
 * Songs Controller
 * Handles all HTTP requests to /songs resource
 * References to requirements outlined in M1 assignment design
 * are in the comments as REQ X
 */
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  // Helper function to send response in either JSON or CSV format
  private sendResponse(res, accept: string, data: any) {
    if (accept == 'text/csv') {
      res.header('Content-Type', 'text/csv');
      res.send(parse(data));
    } else {
      res.send(data);
    }
  }

  /**
   * REQ 1 Get Portion
   * To retrieve all information for a specific song by
   * its unique ID
   * @param id ID of song
   * @param accept Accept header
   * @param res Response object
   */
  @Get(':id')
  async getSongById(
    @Param('id') id: string,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    const song = await this.songsService.getSongById(id);
    this.sendResponse(res, accept, song);
  }

  /**
   * REQ 1 Create Portion
   * To create all information for a specific song by
   * its unique ID
   * @param id ID of song
   * @param accept Accept header
   * @param res Response object
   */
  @Post('')
  async createSong(
    @Body() createSongDto: CreateSongDto,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    const song = await this.songsService.createSong(createSongDto);
    this.sendResponse(res, accept, song);
  }

  /**
   * REQ 1 Update Portion
   * To update all information for a specific song by
   * its unique ID
   * @param id ID of song
   * @param accept Accept header
   * @param res Response object
   */
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

  /**
   * REQ 1 Delete Portion
   * To delete all information for a specific song by
   * its unique ID
   * @param id ID of song
   * @param accept Accept header
   * @param res Response object
   */
  @Delete(':id')
  async deleteSongById(
    @Param('id') id: string,
    @Headers('Accept') accept: string,
    @Res() res
  ) {
    const song = await this.songsService.deleteSongById(id);
    this.sendResponse(res, accept, song);
  }

  /**
   * REQ 2
   * To retrieve all songs with a given name, or none if there is no song with
   * this name or no name was provided
   * REQ 5
   * To retrieve a list of the top N, N > 1 songs by popularity for a given year,
   * returned in batches of M = {10, 20, 50, 100}.
   * @param name Name of song
   * @param year Year of song(s)
   * @param limit Limit of songs to return
   * @param skip Skip number of songs
   * @param accept Accept header
   * @param res Response object
   */
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
