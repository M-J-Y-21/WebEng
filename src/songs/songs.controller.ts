import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { ApiTags } from '@nestjs/swagger';
import { Song } from './entities/song.entity';
import { Query } from '@nestjs/common/decorators';
import { UpdateSongDto } from './dto/update-songs.dto/update-songs.dto';
import { CreateSongDto } from './dto/create-songs.dto/create-songs.dto';

@ApiTags('songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  async getTopSongs(@Query('year') year: number, @Query('n') n: number, @Query('m') m: number) {
    return await this.songsService.getTopSongs(year, n, m);
  }

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  // @ApiOkResponse({ type: Song, isArray: true })
  // @ApiQuery({ name: 'title', required: false })
  // @ApiQuery({ name: 'year', required: false })
  // @ApiQuery({ name: 'limit', required: false })
  // @ApiQuery({ name: 'content-type', required: false })
  // @Get()
  // findAll(@Query() title: {title : string}, @Query('year') year: number
  // , @Query('limit') limit: number, @Query('content-type') contentType: string): Song[] {
  //   return this.songsService.findAll();
  // }

  // Why is this not working?
  @Get()
  findAll(
    // make query parameters optional
    @Query('title') title: string = '',
    @Query('year', ParseIntPipe) year: number = 0,
    @Query('limit', ParseIntPipe) limit: number = 0,
    @Query('content-type') contentType: string = ''
  ): Song[] {
    console.log('In the controller');
    return this.songsService.findAll(title, year, limit, contentType);
  }

  @Get('/test1')
  findByYear(@Query() query: { year: number }): Song[] {
    console.log(query.year);
    return this.songsService.findAll(undefined, query.year);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }
}
