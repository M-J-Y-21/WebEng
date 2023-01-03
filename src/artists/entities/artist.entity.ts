import { ApiProperty } from "@nestjs/swagger";

export class Artist {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    popularity: number;
}
