import { Artist } from '../models/artist.model';
import { ArtistPaginationQuery } from '../models/artist-query.model';

function constructUrl(url: string, props: ArtistPaginationQuery | Artist) {
  let newUrl = new URL(url);

  const params = new URLSearchParams();

  for (let [key, value] of Object.entries(props)) {
    if (value) {
      params.set(key, value.toString());
    }
  }

  return newUrl + params.toString();
}

export { constructUrl };
