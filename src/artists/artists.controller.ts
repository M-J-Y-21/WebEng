import { Controller, Get, Param } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get(':id/songs')
  async getSongs(@Param('id') idOrName: string) {
    const songs = await this.artistsService.getSongsByArtist(idOrName);
    return songs;
  }
}
