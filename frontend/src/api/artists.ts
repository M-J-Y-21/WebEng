import axios from 'axios';
import { Artist } from '../models/artist.model';
import { constructUrl } from '../utils/url';
import { ArtistPaginationQuery } from '../models/artist-query.model';
import { ArtistSummaryType } from '../models/artist-summary.model';
import { Song } from '../models/song.model';

/**
 * Function used to get artists from the backend
 * @param props the artist pagination query
 * @returns a list of artists
 */
async function getTopArtists(props: ArtistPaginationQuery): Promise<Artist[]> {
  let url = constructUrl(`http://localhost:3000/artists?`, props);
  const res = await axios.get(url);
  return res.data;
}

/**
 * Gets artist summary from the api.
 * @param artist the artist used to get the summary
 * @returns the summary
 */
async function getSummary(artist: Artist): Promise<ArtistSummaryType[]> {
  let url = constructUrl(`http://localhost:3000/artists/summary?`, artist);
  console.log(url);
  const res = await axios.get(url);
  return res.data;
}

/**
 * Gets songs made by an artist from the api.
 * @param artist
 * @returns the list of songs made by an artist
 */
async function getArtistSongs(artist: Artist): Promise<Song[]> {
  let url = constructUrl('http://localhost:3000/artists/songs?', artist);
  const res = await axios.get(url);
  return res.data;
}

/**
 * Deletes an artist through the api.
 * @param artist the artist who made the songs
 * @returns the response
 */
async function deleteArtistSongs(artist: Artist) {
  let url = constructUrl('http://localhost:3000/artists/songs?', artist);
  const res = await axios.delete(url);
  return res.data;
}

export { getTopArtists, getSummary, getArtistSongs, deleteArtistSongs };
