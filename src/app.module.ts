import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsController } from './songs/songs.controller';
import { SongsService } from './songs/songs.service';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';

@Module({
  imports: [],
  controllers: [AppController, SongsController, ArtistsController],
  providers: [AppService, SongsService, ArtistsService],
})
export class AppModule {}
