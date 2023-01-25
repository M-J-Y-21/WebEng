import axios from 'axios';
import { useState } from 'react';

function CreateSong() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState({
    id: '',
    title: '',
    artist_ids: [],
    popularity: 0,
    release_date: ''
  });

  const [body, setBody] = useState({
    id: '',
    title: '',
    artist_ids: [],
    popularity: 0,
    release_date: {}
  });

  const post = async () => {
    const url = `http://localhost:3000/songs`;
    const data = {
      id: body.id,
      artist_ids: body.artist_ids,
      title: body.title,
      popularity: body.popularity,
      release_date: body.release_date
    };

    try {
      data.popularity = parseInt(String(data.popularity)); // fuck javascript
      const response = await axios.post(url, data);
      setSong(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    post();
    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setBody({
      ...body,
      [event.target.name]: value
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>id:</label>
        <input
          type="text"
          placeholder="id"
          name="id"
          autoFocus={true}
          onChange={handleChange}
        />
        <br></br>

        <label>title:</label>
        <input
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <br></br>

        <label>artist_ids:</label>
        <input
          type="text"
          placeholder="artist_ids"
          name="artist_ids"
          onChange={handleChange}
        />
        <br></br>

        <label>popularity:</label>
        <input
          type="number"
          placeholder="popularity"
          name="popularity"
          onChange={handleChange}
        />
        <br></br>

        <label>release_date:</label>
        <input
          type="date"
          placeholder="release_date"
          name="release_date"
          onChange={(event) =>
            setBody({
              ...body,
              release_date: new Date(event.target.value).toISOString()
            })
          }
        />
        <br></br>

        <input type="submit" value="Add Song" />
      </form>

      {loading && <p>Loading...</p>}

      {submitted && (
        <>
          <h2>Submitted:</h2>
          {song && (
            <>
              <h3>{song.title}</h3>
              <p>
                ID: {song.id} <br></br>
                Artist IDs: {song.artist_ids.toString()} <br></br>
                Popularity: {song.popularity} <br></br>
                Release date:{' '}
                {new Date(song.release_date).toLocaleDateString('nl-NL')}
              </p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export { CreateSong };
