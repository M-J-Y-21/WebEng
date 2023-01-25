import { Link } from 'react-router-dom';
import { Song } from '../models/song.model';
import { DeleteSongsByArtist } from './DeleteSongsByArtist';

interface SongsResultProps {
  songs: Song[];
  loading: boolean;
  id: string;
  name: string;
}
/**
 * Function that renders the artist songs.
 * @param param0 songs and loading used for the JSX
 * @returns the JSX element for rendering the element
 */
function SongsByArtist({ songs, loading, id, name }: SongsResultProps) {
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : songs.length === 0 ? (
        <p>No results</p>
      ) : (
        <>
          <DeleteSongsByArtist id={id} name={name} />
          <li>
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
          </li>
        </>
      )}
    </div>
  );
}

export { SongsByArtist };
