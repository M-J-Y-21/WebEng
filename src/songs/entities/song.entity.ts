import { ApiProperty } from "@nestjs/swagger";

export class Song {
    @ApiProperty()
    year: number;
    
    @ApiProperty()
    title: string;

    @ApiProperty()
    contentType?: string;

    @ApiProperty()
    limit?: number;



}