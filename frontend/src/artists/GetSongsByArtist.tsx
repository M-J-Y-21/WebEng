import { useState } from 'react';
import { Song } from '../models/song.model';
import { getArtistSongs } from '../api/artists';
import { SongsByArtist } from './SongsByArtist';

/**
 * Makes a form and on submit returns the song artists.
 * @returns an element rendering an artist's songs
 */
function GetSongsByArtist() {
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">id: </label>
        <input
          type="text"
          id="id"
          name="id"
          onChange={(e) => {
            setId(e.currentTarget.value);
          }}
        />
        <br></br>
        
        <label htmlFor="name">name: </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        <br></br>
        
        <input type="submit" value="Search"></input>
      </form>
      <SongsByArtist songs={songs} loading={loading} id={id} name={name} />
    </div>
  );
}

export { GetSongsByArtist };
