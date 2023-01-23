import { FormEventHandler } from "react";
import { Song } from "../models/song.model";

interface UpdateSongFormProps {
  song?: Song,
  onSubmit: FormEventHandler<HTMLFormElement>
}
/**
 * Form for updating 
 * @param param0 song and onsubmit 
 * @returns update song  
 */
function SongForm({ song, onSubmit }: UpdateSongFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Title</label>
      <input defaultValue={song && song.title} type="text" name="title" id="title" />

      <label htmlFor="artists_id">Artist id</label>
      <input defaultValue={song && song.artist_ids} type="text" name="artist_ids" id="artist_ids" />

      <label htmlFor="release_date">Song release_date</label>
      <input defaultValue={song && new Date(song.release_date).toISOString()} type="date" name="release_date" id="release_date" />

      <label htmlFor="popularity">Popularity</label>
      <input defaultValue={song && song.popularity} type="number" name="popularity" id="popularity" />
      <button type="submit">Update Movie</button>
    </form>
  );
}

export {
  SongForm
};
