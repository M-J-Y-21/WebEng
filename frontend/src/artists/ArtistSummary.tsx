import { ArtistSummaryType } from "../models/artist-summary.model"
import { Song } from "../models/song.model";

interface ArtistResults {
  artists: ArtistSummaryType[]
}

interface Loading {
  loading: boolean
}

type ArtistResultProps = ArtistResults & Loading;

function ArtistSummary({ artists, loading }: ArtistResultProps): JSX.Element {

  function fromSong(song: Song): JSX.Element {
    return (
      <div>
        <p>Title :{song.title}</p>
        <p>Popularity:{song.popularity}</p>
        <p>Artists</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        artists.length === 0 ? <p>No results</p> :
          <ul>
            {artists.map((artist: ArtistSummaryType) =>
              <li>
                <p>{artist.artist.name}</p>
                <p>Num songs:{artist.numSongs}</p>
                <p>Earliest song:</p>
                {fromSong(artist.earliestSong)}
                <p>Latest song:</p>
                {fromSong(artist.latestSong)}
                <p>Most popular song:</p>
                {fromSong(artist.mostPopularSong)}
              </li>
            )}
          </ul>
      )}
    </div>
  )
}

export default ArtistSummary;