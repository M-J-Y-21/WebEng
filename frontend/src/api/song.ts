import axios from "axios"
import { Song } from "../models/song.model"

/**
 * Gets one song with the id
 * @param id the id of the song 
 * @returns the song fetched 
 */
async function getOneSong(id: string): Promise<Song> {
  const res = await axios.get(`http://localhost:3000/songs/${id}`);
  return res.data;
}

async function updateSong(id: string, song: Song) {
  const res = await axios.put(`http://localhost:3000/songs/${id}`, song);
  return res.data;
}

async function deleteSong(id: string) {
  const res = await axios.delete(`http://localhost:3000/songs/${id}`);
  return res.data;
}

export {
  getOneSong,
  updateSong,
  deleteSong
};
