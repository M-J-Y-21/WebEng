import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {

  constructor(private readonly artistsService: ArtistsService) { }

  @Get('songs')
  async getSongs(@Query('id') idOrName: string) {
    return await this.artistsService.getSongsByArtist(idOrName);
  }

  @Delete('songs')
  async deleteSongsByArtist(@Query('id') idOrName: string) {
    return await this.artistsService.deleteSongsByArtist(idOrName);
    // made this return await, and the function async
  }

  @Get('summary')
  async getSummary(
    @Param('id') id: string,
    @Param('name') name: string,
    @Param('content-type') contentType: string
  ) {
    return await this.artistsService.getSummary(id, name, contentType);
  }
  
  @Get()
  async getTopArtists(@Query('year') year: number, @Query('n') n: number, @Query('m') m: number) {
    return await this.artistsService.getTopArtists(year, n, m);
  } // TODO: look at this, is it according to the spec?
}
