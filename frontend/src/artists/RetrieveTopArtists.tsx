import { useEffect, useState } from 'react';
import { Artist } from '../models/artist.model';
import { getTopArtists } from '../api/artists';
import { Pagination } from '../pages/Pagination';

function RetrieveTopArtists() {
  const [results, setResults] = useState([] as Artist[]);
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    await retrieveArtists();
  }

  async function retrieveArtists() {
    setLoading(true);
    try {
      const data: Artist[] = await getTopArtists({ year, skip, limit });
      console.log(data);
      setResults(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  useEffect(() => {
    retrieveArtists();
  }, [limit, skip]);

  const paginationProps = {
    setSkip,
    setLimit,
    limit,
    skip
  };

  return (
    <div>
      <h3>Find Top Artist</h3>
      <form onSubmit={handleSubmit}>
        <label>year: </label>
        <input
          type="number"
          placeholder="year"
          name="year"
          min={1900}
          max={2021}
          onChange={(e) => {
            setYear(parseInt(e.currentTarget.value));
          }}
        />
        <br></br>
        <Pagination {...paginationProps} />
        <br></br>
        
        <input type="submit" value="Retrieve Artists"></input>
        
      </form>
      {loading ? (
        <p>Loading ...</p>
      ) : results.length === 0 ? (
        <p>No results</p>
      ) : (
        <ul>
          {results.map((artist: Artist) => (
            <li key={artist.id}>
              <p>{artist.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { RetrieveTopArtists };
