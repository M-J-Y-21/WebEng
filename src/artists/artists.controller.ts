import { Controller, Delete, Get, Query } from '@nestjs/common';
import { ArtistsService } from './artists.service';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) { }

  // REQ 3 Retrieval, 6
  /**
   * Retrieves a list of songs by an artist (id or name), sorted by popularity,
   * optionally filtered by year and limited to a number of results.
   * Satisfies requirements 3 and 6.
   * @param id Artist ID
   * @param name Artist name
   * @param year Year to filter by
   * @param limit Number of results to limit to
   * @returns The array of songs.
   */
  @Get('songs')
  async getTopSongs(
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('year') year: number,
    @Query('limit') limit: number
  ) {
    return await this.artistsService.getTopSongsByArtist(id, name, year, limit);
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
}
