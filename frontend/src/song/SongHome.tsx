import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneSong } from "../api/song";
import { Song } from "../models/song.model";
import SongUpdate from "./component/SongUpdate";
import SongDelete from "./component/SongDelete";

type PathVariable = {
  id: string,
}

function SongHome(): JSX.Element {
  const { id } = useParams<PathVariable>();
  const [song, setSong] = useState<Song>()
  const [loading, setLoading] = useState(false);

  useEffect(() => { retrieveSongs() }, [id]);

  async function retrieveSongs(): Promise<void> {
    if (id === undefined) {
      return
    }
    setLoading(true);

    try {
      const data: Song = await getOneSong(id);
      console.log(data);
      setSong(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div>
      {
        song ?
          <>
            <SongUpdate song={song} id={id} loading={loading} />
            <SongDelete id={id} />
          </>
          :
          loading ? <p>Loading...</p> : <p>Song not found</p>
      }
    </div>
  )
}

export default SongHome;
