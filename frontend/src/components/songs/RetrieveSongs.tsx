import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function SongList() {
  console.log('In here');
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [year, setYear] = useState(0);
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    betterFetchData();
  };

  const betterFetchData = async () => {
    const url = `http://localhost:3000/songs?year=${year}&limit=${limit}`;
    const response = await axios.get(url);
    setSongs(response.data);
    console.log(response.data);
  };

  const fetchData = async () => {
    setIsLoading(true);
    const title = 'song title';
    const year = 2020;
    const limit = 10;
    const batch = 1;
    const url1 = `/songs?title=${title}&year=${year}&limit=${limit}&batch=${batch}`;
    const url = 'http://localhost:3000/songs?year=2020&limit=3';
    const response = await axios.get(url);
    setSongs(response.data);
    console.log(response.data);
    setIsLoading(false);
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (isLoading) {
  //     fetchData();
  //   }
  // }, [isLoading]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br></br>

        <label>year: </label>
        <input
          type="number"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.valueAsNumber)}
        />
        <br></br>

        {/*<label>limit: </label>
        <input
          type="number"
          name="year"
          value={year}
          onChange={(e) => setYear(e.target.valueAsNumber)}
        />
        <select
          name="limit"
          value={limit}
          onChange={(e) => setLimit(+e.target.value)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <br></br>*/}

        <input type="submit">Get Songs</input>
      </form>

      {/*<button onClick={handleSubmit}>Songs</button>*/}
      {/*{isLoading && <div>Loading...</div>}*/}
      {songs.length > 0 && (
        <ul>
          {songs.map((song, index) => (
            <li key={index}>{song['title']}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SongList;
