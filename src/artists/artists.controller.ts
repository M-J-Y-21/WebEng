import { Controller, Delete, Get, Query, Headers, Res } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { parse } from 'json2csv';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  private sendResponse(res, contentType, data) {
    if (contentType == 'text/csv') {
      res.header('Content-Type', 'text/csv');
      res.send(parse(data));
    } else {
      res.send(data);
    }
  }
  
  // REQ 3 Get
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

  // REQ 3 Delete
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

  // REQ 4
  @Get('summary')
  async getSummary(
    @Query('id') id: string,
    @Query('name') name: string,
    @Headers('Content-Type') contentType: string,
    @Res() res
  ) {
    const summary = this.artistsService.getSummary(id, name);
    this.sendResponse(res, contentType, summary);
  }

  // REQ 6
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
