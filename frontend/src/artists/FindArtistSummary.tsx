import { useState } from 'react';
import { ArtistSummaryType } from '../models/artist-summary.model';
import { getSummary } from '../api/artists';
import { ArtistSummary } from './ArtistSummary';
/**
 * Function that renders the find artist summary form and on submit gets the artist summary.
 * @returns the artist summary element  
 */
function FindArtistSummary()  {
  const [loading, setLoading] = useState(false);
  const [artistSummary, setArtistSummary] = useState([] as ArtistSummaryType[]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    await retrieveArtistSummaries();
  }

  async function retrieveArtistSummaries(): Promise<void> {
    setLoading(true);
    try {
      const artist = {
        name: name,
        id: id
      };
      const data = await getSummary(artist);
      setArtistSummary(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div>
      <h3>Find Artist</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID: </label>
        <input
          type="text"
          id="id"
          name="id"
          onChange={(e) => {
            setId(e.currentTarget.value);
          }}
        />
        <br></br>

        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <br></br>

        <button type="submit">Search</button>
      </form>
      <ArtistSummary artists={artistSummary} loading={loading} />
    </div>
  );
}

export { FindArtistSummary };
