import { deleteArtistSongs } from '../api/artists';

interface DeleteArtistSongsProps {
  id: string;
  name: string;
}

/**
 * Function that renders the deleting
 * @param param0 the id and names props
 * @returns a but that on submit deletes the all songs for an artist
 */
function DeleteSongsByArtist({ id, name }: DeleteArtistSongsProps) {
  async function handleDelete(): Promise<void> {
    if (!id && !name) {
      alert('No song provided');
      return;
    }
    try {
      const artist = {
        id: id,
        name: name
      };
      await deleteArtistSongs(artist);
      alert('Songs deleted');
      window.location.reload(); // duct tape
    } catch (error) {
      alert('Error when deleting song');
      console.error(error);
    }
  }
  return <button onClick={handleDelete}>Delete All Songs</button>;
}

export { DeleteSongsByArtist };
