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
                <h3>{song.title}</h3>
                <p>
                  ID: {song.id} <br></br>
                  Artist IDs: {song.artist_ids.join(', ')} <br></br>
                  Popularity: {song.popularity} <br></br>
                  Release date:{' '}
                  {new Date(song.release_date).toLocaleDateString('nl-NL')}
                  <br></br>
                  <Link to={`/songs/${song.id}`}>More info</Link>
                </p>
              </li>
            ))}
          </ul>
        )}
      </li>
    </div>
  );
}
export { ArtistSongs };
