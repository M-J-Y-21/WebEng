import axios from "axios"
import { Artist } from "../models/artist.model";
import { constructUrl } from "../utils/url";
import { ArtistsPaginationQuery } from "../models/pagination";
import { ArtistSummaryType } from "../models/artist-summary.model";

async function getTopArtists(props: ArtistsPaginationQuery): Promise<Artist[]> {
  let url = constructUrl(`http://localhost:3000/artists?`, props);
  const res = await axios.get(url);
  return res.data;
}

async function getSummary(artist: Artist): Promise<ArtistSummaryType[]> {
  let url = `http://localhost:3000/artists/summary?`;
  url += artist.id ? `id=${artist.id}&` : '';
  url += artist.name ? `name=${artist.name}&` : '';
  url = url.slice(0, -1);
  console.log(url);
  const res = await axios.get(url);
  return res.data;
}

export {
  getTopArtists,
  getSummary,
};