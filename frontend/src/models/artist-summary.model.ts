import { Artist } from './artist.model';
import { Song } from './song.model';

interface ArtistSummaryType {
  artist: Artist;
  numSongs: number;
  earliestSong: Song;
  latestSong: Song;
  mostPopularSong: Song;
}

export type { ArtistSummaryType };
