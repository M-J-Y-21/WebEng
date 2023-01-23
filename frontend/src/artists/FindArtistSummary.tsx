import { useState } from "react";
import { ArtistSummaryType } from "../models/artist-summary.model";
import { getSummary } from "../api/artists";
import { title } from "process";
import { ArtistSummary } from "./ArtistSummary";


function FindArtistSummary() {
  const [loading, setLoading] = useState(false);
  const [artistSummary, setArtistSummary] = useState([] as ArtistSummaryType[]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(): Promise<void> {
    setLoading(true);
    try {
    const artist = {
      name: name,
      id: id
    }
    const data = await getSummary(artist);
    setArtistSummary(data);
  } catch (error){
    console.error(error);
    
  }

    setLoading(false)
  }
  return (
    <div>
      <h3>Find Artist</h3>
      <form onSubmit={handleSubmit} >
        <label htmlFor="id">Id</label>
        <input  type="text"  id="id" name ="id" onChange={(e) => {setId(e.currentTarget.value);}}/>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={(e) => {setName(e.currentTarget.value);}} />
        <button type="submit">Search</button>
      </form> 
      <ArtistSummary  artists={artistSummary} loading={loading} />
    </div>
  );
}
export {
  FindArtistSummary,
};