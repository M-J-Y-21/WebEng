import { Song } from "../models/song.model";

function getFormValues(formData: FormData): Song {
  const title = formData.get('title') as string;
  const release_date = formData.get('release_date') as string;
  const artist_ids = formData.get('artist_ids') as string;
  const popularity = parseInt(formData.get('popularity') as string);

  const artist_ids_array = artist_ids.split(',');

  const body: Song = {
    title: title,
    artist_ids: artist_ids_array,
    release_date: new Date(release_date),
    popularity: popularity
  }

  return body;
}

export {
  getFormValues,
}
