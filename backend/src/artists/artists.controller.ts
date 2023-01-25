import { Controller, Delete, Get, Query, Headers, Res } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { parse } from 'json2csv';

/**
 * Artists Controller
 * Handles all HTTP requests to /artists resource
 * References to requirements outlined in M1 assignment design
 * are in the comments as REQ X
 */
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // Helper function to send response in either JSON or CSV format
  private sendResponse(res, contentType, data) {
    if (contentType == 'text/csv') {
      res.header('Content-Type', 'text/csv');
      res.send(parse(data));
    } else {
      res.send(data);
    }
  }

  /**
   * REQ 3 Get Portion
   * To retrieve all songs for a specific artist by artist ID or artist name
   * @param id ID of artist
   * @param name Name of artist
   * @param contentType Desired response format
   * @param res Response object
   */
  @Get('songs')
  async getSongsByArtist(
    @Query('id') id: string,
    @Query('name') name: string,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const songs = await this.artistsService.getSongsByArtist(id, name);
    this.sendResponse(res, contentType, songs);
  }

  /**
   * REQ 3 Delete Portion
   * To delete all songs for a specific artist by artist ID or artist name
   * @param id ID of artist
   * @param name Name of artist
   * @param contentType Desired response format
   * @param res Response object
   */
  @Delete('songs')
  async deleteSongsByArtist(
    @Query('id') id: string,
    @Query('name') name: string,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const songs = await this.artistsService.deleteSongsByArtist(id, name);
    this.sendResponse(res, contentType, songs);
  }

  /**
   * REQ 4
   * To retrieve summary information (number of songs, earliest and latest
   * release by date, highest popularity among all songs) for a specific artist
   * by artist ID or artist name
   * @param id ID of artist
   * @param name Name of artist
   * @param contentType Desired response format
   * @param res Response object
   */
  @Get('summary')
  async getSummary(
    @Query('id') id: string,
    @Query('name') name: string,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const summary = await this.artistsService.getSummary(id, name);
    this.sendResponse(res, contentType, summary);
  }

  /**
   * REQ 6
   * To retrieve a list of the top N, N > 1 artists by popularity for a given year,
   * returned in batches of M = {10, 20, 50, 100};
   * @param year Year to get top artists from
   * @param limit Limit of artists to return
   * @param skip Skip this many artists
   * @param contentType Desired response format
   * @param res Response object
   */
  @Get('')
  async getTopArtists(
    @Query('year') year: number,
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const artists = await this.artistsService.getTopArtists(year, limit, skip);
    this.sendResponse(res, contentType, artists);
  }
}
