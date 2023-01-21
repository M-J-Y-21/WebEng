import { useState } from "react";
import { Song } from "../../models/song.model";
import { SongForm } from "../../pages/SongForm";
import { updateSong } from "../../api/song";
import { getFormValues } from "../../utils/form";
import { SongResult } from "./SongResult";

interface UpdateSongProp {
  song?: Song,
  id?: string,
  loading: boolean,
}

function SongUpdate({ song, id, loading }: UpdateSongProp): JSX.Element {

  const [formDisabled, setFormDisabled] = useState(true);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!id || !song) {
      return;
    }
    const form = event.currentTarget;
    const formData = new FormData(form);
    const body: Song = getFormValues(formData);

    try {
      await updateSong(id, body);
    } catch (error) {
      alert('Error while updating');
      console.error(error);
    }
  }

  return (
    <div>
      {formDisabled ?
        <>
          <SongResult song={song} loading={loading} />
          <button onClick={() => setFormDisabled(false)}>Edit Song</button>
        </>
        :
        <>
          <SongForm song={song} onSubmit={handleSubmit} />
          <button onClick={() => setFormDisabled(true)}>Cancel</button>
        </>
      }
    </div>
  );
}

export {
  SongUpdate
}
