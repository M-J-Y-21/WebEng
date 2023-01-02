import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  
  constructor(private readonly artistsService: ArtistsService) {}
  
  @Get(':id/songs')
  async getSongs(@Param('id') idOrName: string) {
    return await this.artistsService.getSongsByArtist(idOrName);
  }
  
  @Delete(':id/songs')
  async deleteSongsByArtist(@Param('id') idOrName: string) {
    return await this.artistsService.deleteSongsByArtist(idOrName);
    // made this return await, and the function async
  }
  
  @Get('summary')
  async getSummary() {
    return await this.artistsService.getSummary(
      @Param('id') id: string,
      @Param('name') name: string,
      @Param('content-type') contentType: string
    );
  }
}
