import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FindArtistSummary } from './artists/FindArtistSummary';
import { RetrieveSongArtist } from './artists/RetrieveSongArtist';
import { RetrieveTopArtists } from './artists/RetrieveTopArtists';
import { Header } from './components/Header';
import { CreateSong } from './pages/CreateSong';
import { FindSongById } from './pages/FindSongById';
import { Home } from './pages/Home';
import { NoContent } from './pages/NoContent';
import { RetrieveSongs } from './pages/RetrieveSongs';
import { SongHome } from './song/SongHome';

function App() {
  return (
    <div className="App">
      <h1>Music Library API</h1>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs/:id" element={<SongHome />} />
          <Route path="/create" element={<CreateSong />} />
          <Route path="/retrieveById" element={<FindSongById />} />
          <Route path="/retrieve" element={<RetrieveSongs />} />
          <Route path="/artists" element={<RetrieveTopArtists />} />
          <Route path="/artists/summary" element={<FindArtistSummary />} />
          <Route path="/artists/songs" element={<RetrieveSongArtist />} />
          <Route path="*" element={<NoContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
