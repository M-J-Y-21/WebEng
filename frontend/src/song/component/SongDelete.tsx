import { deleteSong } from "../../api/song";

interface SongDeleteProp {
    id? : string,
}

function SongDelete({id} : SongDeleteProp) {

    async function handleDelete() : Promise<void> {
        if (!id) {
            alert("No song provided");
            return;
        }
        try {
            const data = await deleteSong(id);
            alert("Song deleted");
        } catch (error) {
            alert("Error when deleting song");
            console.error(error);
        }
    }
    return (
        <button onClick={handleDelete}>Delete song</button>
    );
}

export {
    SongDelete,
}
