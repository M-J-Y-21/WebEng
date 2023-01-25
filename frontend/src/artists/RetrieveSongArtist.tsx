import { useState } from 'react';
import { Song } from '../models/song.model';
import { getArtistSongs } from '../api/artists';
import ArtistSongs from './ArtistSongs';

function RetrieveSongArtist() {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([] as Song[]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    await retrieveArtistSongs();
  }

  async function retrieveArtistSongs(): Promise<void> {
    setLoading(true);
    try {
      const artist = {
        name: name,
        id: id
      };
      const data = await getArtistSongs(artist);
      setSongs(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div>
      <h3>Find The songs an artist wrote</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <input
          type="text"
          id="id"
          name="id"
          onChange={(e) => {
            setId(e.currentTarget.value);
          }}
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
      <ArtistSongs songs={songs} loading={loading} />
    </div>
  );
}
export default RetrieveSongArtist;
