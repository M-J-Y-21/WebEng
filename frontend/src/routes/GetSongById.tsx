import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * Function used for rerouting to the SongHome when submiting form to find song.
 */
function GetSongById() {
  let navigate = useNavigate();
  const [id, setId] = useState('');

  function handleSubmit(event: any) {
    event.preventDefault();
    navigate(`/songs/${id}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>id: </label>
        <input
          type="text"
          name="id"
          required={true}
          onChange={(e) => {
            setId(e.currentTarget.value);
          }}
        ></input>
        <br></br>

        <input type="submit" value="Find Song"></input>
      </form>
    </div>
  );
}

export { GetSongById };
