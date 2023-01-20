import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSongDto } from '../create-songs.dto/create-songs.dto';

export class UpdateSongDto extends PartialType(OmitType(CreateSongDto, ['id'] as const)) {}
