import { Song } from "../../models/song.model";

interface SongResProp {
    song ?: Song,
    loading : boolean,
}


function SongResult({song,loading}:SongResProp):JSX.Element {
    if (!song) {
        return <h1>No song found </h1>;
    }
    function fromSong() : JSX.Element {
        if (!song) {
            return <h1>No song found</h1>
        }
        return (
            <div>
                <h1>Title : {song.title}</h1>
                <p>Release Date : {new Date(song.release_date).toISOString()}</p>
                <p>Artist Ids : {song.artist_ids}</p>
                <p>Popularity : {song.popularity}</p>
            </div>
        );
    }

    return (
        <div>
            {loading ?<p>Loading...</p> : fromSong()}
        </div>
    )
}

export {
    SongResult,
};