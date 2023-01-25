import { Link } from "react-router-dom";
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
            <Link to="/create">Create</Link>
          </li>
          <li>
            <Link to="/retrieve">Retrieve</Link>
          </li>
          <li>
            <Link to="/artists">Find Top Artists</Link>
          </li>
          <li>
            <Link to="/artists/summary" >Find artist(s)</Link>
          </li>
          <li>
            <Link to="/artists/songs" >Find what songs an artist wrote</Link>
          </li>
        </ul>
      </nav>
      
      <hr></hr>
  </div>
  )
}

export default Header;
