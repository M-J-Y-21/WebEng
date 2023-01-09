import { Controller, Delete, Get, Query, Header } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // REQ 3 Get
  @Get('songs')
  async getTopSongs(@Query('id') id: string, @Query('name') name: string) {
    return await this.artistsService.getSongsByArtist(id, name);
  }

  // REQ 3 Delete
  @Delete('songs')
  async deleteSongsByArtist(@Query('id') id: string, @Query('name') name: string) {
    return await this.artistsService.deleteSongsByArtist(id, name);
  }

  // REQ 4
  @Get('summary')
  async getSummary(@Query('id') id: string, @Query('name') name: string) {
    return await this.artistsService.getSummary(id, name);
  }

  // REQ 6
  @Get('')
  @Header('content-type', 'application/json')
  async getTopArtists(@Query('year') year: number, @Query('limit') limit: number, @Query('skip') skip: number) {
    return await this.artistsService.getTopArtists1(year, limit, skip);
  }
  
  // REQ 6
  @Get('')
  @Header('content-type', 'text/html')
  async getTopArtists(@Query('year') year: number, @Query('limit') limit: number, @Query('skip') skip: number) {
    return await this.artistsService.getTopArtists1(year, limit, skip).toCsv;
  }
}
