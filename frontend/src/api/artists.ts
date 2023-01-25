import axios from "axios"
import { Artist } from "../models/artist.model";
import { constructUrl } from "../utils/url";
import { ArtistsPaginationQuery } from "../models/pagination";
import { ArtistSummaryType } from "../models/artist-summary.model";
import { fsync } from "fs";
import { Song } from "../models/song.model";

async function getTopArtists(props: ArtistsPaginationQuery): Promise<Artist[]> {
  let url = constructUrl(`http://localhost:3000/artists?`, props);
  const res = await axios.get(url);
  return res.data;
}

async function getSummary(artist: Artist): Promise<ArtistSummaryType[]> {
  let url = constructUrl(`http://localhost:3000/artists/summary?`,artist);
  console.log(url);
  const res = await axios.get(url);
  return res.data;
}

async function getArtistSongs(artist:Artist) : Promise<Song[]>{
  let url = constructUrl('http://localhost:3000/artists/songs?',artist);
  const res = await axios.get(url);
  return res.data;
}

async function deleteArtistSongs(artist:Artist) {
  let url = constructUrl('http://localhost:3000/artists/songs?',artist);
  const res = await axios.delete(url);
  return res.data;
}


export {
  getTopArtists,
  getSummary,
  getArtistSongs,
  deleteArtistSongs
};