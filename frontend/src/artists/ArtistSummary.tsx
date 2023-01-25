import { useState } from 'react';
import { ArtistSummaryType } from '../models/artist-summary.model';
import { Song } from '../models/song.model';

interface ArtistResults {
  artists: ArtistSummaryType[];
}

interface Loading {
  loading: boolean;
}

type ArtistResultProps = ArtistResults & Loading;

interface ToggleItemProps {
  song: JSX.Element;
}

const ToggleItem = ({ song }: ToggleItemProps) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow((prev) => !prev)}>Show/hide</button>
      {show && <div>{song}</div>}
    </>
  );
};

/**
 * Function which shows the summary of multiple artists 
 * @param param0 the artists and loading param 
 * @returns the artist summary JSX element 
 */
function ArtistSummary({ artists, loading }: ArtistResultProps): JSX.Element {
  function fromSong(song: Song): JSX.Element {
    return (
      <>
        Title: {song.title} <br></br>
        Popularity: {song.popularity} <br></br>
        Artist IDs: {song.artist_ids.join(', ')}
      </>
    );
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : artists.length === 0 ? (
        <p>No results</p>
      ) : (
        <ul>
          {artists.map((artist: ArtistSummaryType) => (
            <li key={artist.artist.id}>
              Name: {artist.artist.name} <br></br>
              Number of songs: {artist.numSongs} <br></br>
              Earliest song: 
              <ToggleItem song={fromSong(artist.earliestSong)} /> <br></br>
              Latest song: 
              <ToggleItem song={fromSong(artist.latestSong)} /> <br></br>
              Most popular song: 
              <ToggleItem song={fromSong(artist.mostPopularSong)} /> <br></br>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { ArtistSummary };
