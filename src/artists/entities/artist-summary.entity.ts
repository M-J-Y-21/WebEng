import { Song } from "../../songs/interfaces/song.interface";

export class ArtistSummary {
    name: string;
    
    numSongs: number;
    
    mostPopularSong: Song;
    
    earliestSong: Song;
    
    latestSong: Song;
}
