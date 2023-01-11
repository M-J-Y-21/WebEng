import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyForm from './components/songs/RetrieveSongs2';
import SongList from './components/songs/RetrieveSongs';

function App() {
  return (
    <div>
      <h1>My First React App</h1>
      <p>Welcome :)</p>
      <SongList />
    </div>
  );
}

export default App;
