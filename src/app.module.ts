import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsController } from './songs/songs.controller';
import { SongsService } from './songs/songs.service';
import { SeedingController } from './seeding/seeding.controller';

@Module({
  imports: [],
  controllers: [AppController, SongsController, SeedingController],
  providers: [AppService, SongsService],
})
export class AppModule {}
