import { ApiProperty } from "@nestjs/swagger";
import { Song } from "../../songs/entities/song.entity";

export class ArtistSummary {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    numSongs: number;
    
    @ApiProperty()
    mostPopularSong: Song;
    
    @ApiProperty()
    earliestSong: Song;
    
    @ApiProperty()
    latestSong: Song;
}
