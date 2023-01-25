import axios from 'axios';
import { Song } from '../models/song.model';

/**
 * Gets one song with the id.
 * @param id the id of the song
 * @returns the song fetched
 */
async function getOneSong(id: string): Promise<Song> {
  const res = await axios.get(`http://localhost:3000/songs/${id}`);
  return res.data;
}

/**
 * Update song by id through the api.
 * @param id the id of the song
 * @param the updated song 
 * @returns response 
 */
async function updateSong(id: string, song: Song) {
  const res = await axios.put(`http://localhost:3000/songs/${id}`, song);
  return res.data;
}

/**
 * Deletes a song by id. 
 * @param id 
 * @returns response  
 */
async function deleteSong(id: string) {
  const res = await axios.delete(`http://localhost:3000/songs/${id}`);
  return res.data;
}

export { getOneSong, updateSong, deleteSong };
