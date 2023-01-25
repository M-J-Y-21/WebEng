interface Song {
  id?: string;
  title: string;
  artist_ids: string[];
  popularity: number;
  release_date: Date;
}

export type { Song };
