import { Song } from "../../songs/interfaces/song.interface";
import { Artist } from "./artist.interface";

export interface ArtistSummary {
    
    artist: Artist;
    numSongs: number;
    earliestSong: Song;
    latestSong: Song;
    mostPopularSong: Song;
    
}
