import { IsAlpha, IsDate, IsNumber, Max, Min } from "class-validator";

export class CreateSongDto {

    @IsAlpha()
    title: string;

    year: number;

    artist_ids?: string[];

    @Max(100)
    @Min(0)
    @IsNumber()
    popularity?: number;

    @IsDate()
    release_date?: Date;

}
