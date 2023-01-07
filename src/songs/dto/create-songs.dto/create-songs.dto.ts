import { IsArray, IsDateString, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateSongDto {

    @IsString()
    title: string;

    @IsString({ each: true })
    artist_ids: string[];

    @IsNumber()
    @Min(0)
    @Max(100)
    popularity?: number;

    @IsDateString()
    release_date?: Date;

}
