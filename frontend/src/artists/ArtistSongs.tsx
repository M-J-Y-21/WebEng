import { Link } from 'react-router-dom';
import { Song } from '../models/song.model';

interface SongResults {
  songs: Song[];
}

interface Loading {
  loading: boolean;
}

type SongsResultProps = SongResults & Loading;

function ArtistSongs({ songs, loading }: SongsResultProps) {
  return (
    <div>
      <li>
        {loading ? (
          <p>Loading...</p>
        ) : songs.length === 0 ? (
          <p>No results</p>
        ) : (
          <ul>
            {songs.map((song: Song) => (
              <li key={song.id}>
                <h1>Title : {song.title}</h1>
                <p>
                  Release Date : {new Date(song.release_date).toISOString()}
                </p>
                <p>Artist Ids : {song.artist_ids}</p>
                <p>Popularity : {song.popularity}</p>
                <Link to={`/songs/${song['id']}`}>More info</Link>
              </li>
            ))}
          </ul>
        )}
      </li>
    </div>
  );
}
export default ArtistSongs;
