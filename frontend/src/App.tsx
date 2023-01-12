import './App.css';
import RetrieveSongs from './components/songs/RetrieveSongs';

function App() {
  return (
    <div className="App">
      <h1>Music Library API</h1>
      <p>Use the input fields below to filter songs in the database.</p>
      <RetrieveSongs />
    </div>
  );
}

export default App;
