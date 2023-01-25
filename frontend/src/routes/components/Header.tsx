import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/create-song">Create song</Link>
          </li>
          <li>
            <Link to="/get-song-by-id">Retrieve songs by ID</Link>
          </li>
          <li>
            <Link to="/songs">Retrieve, update or delete songs by title or year</Link>
          </li>
          <li>
            <Link to="/top-artists-by-year">Retrieve top artists by year</Link>
          </li>
          <li>
            <Link to="/artist-summary">Retrieve artist summary</Link>
          </li>
          <li>
            <Link to="/songs-by-artist">Retrieve or delete songs by artist</Link>
          </li>
        </ul>
      </nav>

      <hr></hr>
    </div>
  );
}

export { Header };
