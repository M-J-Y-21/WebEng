import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GetArtistSummary } from './artists/GetArtistSummary';
import { GetSongsByArtist } from './artists/GetSongsByArtist';
import { GetTopArtistsByYear } from './artists/GetTopArtistsByYear';
import { Header } from './routes/components/Header';
import { CreateSong } from './routes/CreateSong';
import { GetSongById } from './routes/GetSongById';
import { Home } from './routes/Home';
import { NoContent } from './routes/NoContent';
import { GetSongs } from './routes/GetSongs';
import { SongHome } from './routes/songs/SongHome';

function App() {
  return (
    <div className="App">
      <h1>Music Library API</h1>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/songs/:id" element={<SongHome />} />
          <Route path="/create-song" element={<CreateSong />} />
          <Route path="/get-song-by-id" element={<GetSongById />} />
          <Route path="/songs" element={<GetSongs />} />
          <Route
            path="/top-artists-by-year"
            element={<GetTopArtistsByYear />}
          />
          <Route path="/artist-summary" element={<GetArtistSummary />} />
          <Route path="/songs-by-artist" element={<GetSongsByArtist />} />
          <Route path="/*" element={<NoContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
