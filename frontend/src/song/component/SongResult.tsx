import { Song } from '../../models/song.model';

interface SongResProp {
  song?: Song;
  loading: boolean;
}

/**
 * Component that renders one song.
 */
function SongResult({ song, loading }: SongResProp): JSX.Element {
  if (!song) {
    return <h1>No song found </h1>;
  }
  
  function fromSong(): JSX.Element {
    if (!song) {
      return <h1>No song found</h1>;
    }
    return (
      <div>
        <h1>{song.title}</h1>
        <p>
          Release date: {new Date(song.release_date).toLocaleDateString('nl-NL')} <br></br>
          Artist IDs: {song.artist_ids.join(', ')} <br></br>
          Popularity: {song.popularity}
        </p>
      </div>
    );
  }

  return <div>{loading ? <p>Loading...</p> : fromSong()}</div>;
}

export { SongResult };
