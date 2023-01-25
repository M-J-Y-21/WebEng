import { Link } from 'react-router-dom';

function NoContent() {
  return (
    <div>
      <h1>404</h1>
      <p>
        Page not found. <br></br>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
}

export { NoContent };
