import { useState } from "react";
import { deleteArtistSongs } from "../api/artists";
import { Artist } from "../models/artist.model";


interface DeleteArtistSongsProps {
  id : string,
  name : string
};
/**
 * Function that renders the deleting 
 * @param param0 the id and names props 
 * @returns a but that on submit deletes the all songs for an artist 
 */
function DeleteArtistSong({id,name}: DeleteArtistSongsProps) {
  
  async function handleDelete(): Promise<void> {
    if (!id && !name) {
      alert("No song provided");
      return;
    }
    try {
      const artist = {
        id : id,
        name : name
      }
      await deleteArtistSongs(artist);
      alert("Songs deleted");
    } catch (error) {
      alert("Error when deleting song");
      console.error(error);
    }
  }
  return (
    <button onClick={handleDelete}>Delete Song</button>
  );
}
export default DeleteArtistSong;
