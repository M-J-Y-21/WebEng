import { FormEventHandler } from 'react';
import { Song } from '../../models/song.model';

interface UpdateSongFormProps {
  song?: Song;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

/**
 * Form for updating
 * @param param0 song and onsubmit
 * @returns update song
 */
function UpdateSongForm({ song, onSubmit }: UpdateSongFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">title: </label>
      <input
        defaultValue={song && song.title}
        type="text"
        name="title"
        id="title"
      />
      <br></br>

      <label htmlFor="artists_id">artist_ids: </label>
      <input
        defaultValue={song && song.artist_ids}
        type="text"
        name="artist_ids"
        id="artist_ids"
      />
      <br></br>

      <label htmlFor="release_date">release_date: </label>
      <input
        defaultValue={song && new Date(song.release_date).toLocaleDateString('en-CA')} // en-CA returns yyyy-mm-dd
        type="date"
        name="release_date"
        id="release_date"
      />
      <br></br>

      <label htmlFor="popularity">popularity: </label>
      <input
        defaultValue={song && song.popularity}
        type="number"
        name="popularity"
        id="popularity"
      />
      <br></br>
      
      <input type="submit" value="Update Song"></input>
    </form>
  );
}

export { UpdateSongForm };
