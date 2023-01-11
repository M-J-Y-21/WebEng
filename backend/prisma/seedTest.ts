import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as fs from 'fs';
import { parseFile } from 'fast-csv';

async function main() {
  // clear the whole database
  await prisma.song.deleteMany();
  await prisma.artist.deleteMany();
  console.log('Cleared database');

  // seed songs
  parseFile('data/songs-sample.csv', { headers: true })
    .on('error', (error) => console.error(error))
    .on('data', async row => {
      await prisma.song.upsert({
        where: { id: row.id },
        update: {
          title: row.title,
          artist_ids: eval(row.artist_ids),
          popularity: parseInt(row.popularity),
          release_date: new Date(row.release_date),
        },
        create: {
          id: row.id,
          title: row.title,
          artist_ids: eval(row.artist_ids),
          popularity: parseInt(row.popularity),
          release_date: new Date(row.release_date),
        },
      });
    })
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} songs`));

  // seed artists
  parseFile('data/artists-sample.csv', { headers: true })
    .on('error', (error) => console.error(error))
    .on('data', async row => {
      await prisma.artist.upsert({
        where: { id: row.id },
        update: {
          name: row.name,
        },
        create: {
          id: row.id,
          name: row.name,
        },
      });
      //console.log(artist);
    })
    .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} artists`));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
