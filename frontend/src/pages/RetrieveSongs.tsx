import { useState } from 'react';
import axios from 'axios';

function RetrieveSongs() {
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [songs, setSongs] = useState([]);

  const [params, setParams] = useState({
    title: "",
    year: 0,
    limit: 0,
    skip: 0
  })

  const get = async () => {
    let url = `http://localhost:3000/songs?`;
    url += params.title ? `title=${params.title}&` : '';
    url += params.year ? `year=${params.year}&` : '';
    url += params.limit ? `limit=${params.limit}&` : '';
    url += params.skip ? `skip=${params.skip}&` : '';
    url = url.slice(0, -1);
    
    try {
      const response = await axios.get(url);
      setSongs(response.data);
      console.log(response.data);
  } catch (error) {
      console.log(error);
    }
  };
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    get();
    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    setParams({
      ...params,
      [event.target.name]: value
    });
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>title: </label>
        <input
          type="text"
          placeholder="title"
          name="title"
          autoFocus={true}
          onChange={handleChange}
        />
        <br></br>

        <label>year: </label>
        <input
          type="number"
          placeholder="year"
          name="year"
          min={1900}
          max={2021}
          onChange={handleChange}
        />
        <br></br>

        <label>limit: </label>
        <select
          name="limit"
          placeholder="limit"
          onChange={handleChange}
        >
          <option value="0">No limit</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <br></br>
        
        <label>skip: </label>
        <input
          type="number"
          placeholder="skip"
          name="skip"
          min={0}
          onChange={handleChange}
        />
        <br></br>

        <input type="submit" value="Retrieve Songs"></input>
      </form>

      {loading && <p>Loading...</p>}

      {submitted && (
        <>
          <h2>Results</h2>
          {songs.length > 0 ? (
            <ul>
              {songs.map((song, index) => (
                <li key={index}>
                  <h3>{song['title']}</h3>
                  <p>
                    ID: {song['id']} <br></br>
                    Artist IDs: {(song['artist_ids'] as string).toString()} <br></br>
                    Popularity: {song['popularity']} <br></br>
                    Release date: {new Date(song['release_date']).toLocaleDateString('nl-NL')}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No songs found</p>
          )}
        </>
      )}
    </div>
  );
}

export default RetrieveSongs;
