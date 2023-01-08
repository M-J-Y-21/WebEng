import { Controller, Delete, Get, Query } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  // REQ 3 Get
  @Get('songs')
  async getTopSongs(
    @Query('id') id: string,
    @Query('name') name: string,
  ) {
    return await this.artistsService.getSongsByArtist(id, name);
  }

  // REQ 3 Delete
  @Delete('songs')
  async deleteSongsByArtist(
    @Query('id') id: string,
    @Query('name') name: string
  ) {
    return await this.artistsService.deleteSongsByArtist(id, name);
  }

  // REQ 4
  @Get('summary')
  async getSummary(
    @Query('id') id: string,
    @Query('name') name: string
  ) {
    return await this.artistsService.getSummary(id, name);
  }

  // REQ 6
  @Get()
  async getTopArtists(@Query('year') year: number, @Query('limit') limit: number, @Query('batch') batch: number) {
    return await this.artistsService.getTopArtists(year, limit, batch);
  }
}
