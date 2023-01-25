import { useNavigate } from 'react-router-dom';
import { deleteSong } from '../../api/song';

interface SongDeleteProp {
  id?: string;
}

/**
 * Component used to delete a song on click.
 */
function SongDelete({ id }: SongDeleteProp) {
  const navigate = useNavigate();
  
  async function handleDelete(): Promise<void> {
    if (!id) {
      alert('No song provided');
      return;
    }
    try {
      await deleteSong(id);
      alert('Song deleted');
      navigate('/songs')
    } catch (error) {
      alert('Error when deleting song');
      console.error(error);
    }
  }
  return <button onClick={handleDelete}>Delete Song</button>;
}

export { SongDelete };
