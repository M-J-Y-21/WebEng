import { PartialType } from '@nestjs/swagger';
import { CreateSongDto } from '../create-songs.dto/create-songs.dto';

export class UpdateSongDto extends PartialType(CreateSongDto) {}
