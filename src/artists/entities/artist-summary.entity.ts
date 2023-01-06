import { Song } from "../../songs/entities/song.entity";

export class ArtistSummary {
    name: string;
    
    numSongs: number;
    
    mostPopularSong: Song;
    
    earliestSong: Song;
    
    latestSong: Song;
}
