import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateSong from './pages/CreateSong';
import RetrieveSongs from './pages/RetrieveSongs';
import Header from './components/Header';
import NoContent from './pages/NoContent';
import './App.css';
import { SongMain } from './song/SongHome';
import { ReceiveTopArtists} from './artists/getTopArtists';
import { FindArtistSummary } from './artists/FindArtistSummary';

function App() {
  return (
    <div className="App">
      <h1>Music Library API</h1>
      
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs/:id" element = {<SongMain />} />
          <Route path="/create" element={<CreateSong />} />
          <Route path="/retrieve" element={<RetrieveSongs />} />
          <Route path='/artists' element={<ReceiveTopArtists/>} />
          <Route path='/artists/summary' element={<FindArtistSummary/>}/>
          <Route path="*" element={<NoContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
