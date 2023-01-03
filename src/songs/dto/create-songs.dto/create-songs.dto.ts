import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsNumber, Max, Min } from "class-validator";

export class CreateSongDto {
    
    @ApiProperty({required: true})
    @IsAlpha()
    title: string;

    @ApiProperty({required: true})
    year: number;

    @ApiProperty({required: false})
    songID?: string;

    @ApiProperty({required: false})
    artistIDs?: string[];

    @ApiProperty({required: false})
    @Max(100)
    @Min(0)
    @IsNumber()
    popularity?: number;

}
