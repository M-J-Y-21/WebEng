import fs from 'fs';
import { Client } from 'pg';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const csv = require('csv-parse');
// Connect to the database
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 123,
  database: 'nest',
});
client.connect();

// Read the artist CSV file and insert the data into the database
fs.createReadStream('artists.csv')
  .pipe(csv())
  .on('data', async (row) => {
    // Insert the artist into the database
    await prisma.artist.create({
      data: {
        id: row[0],
        name: row[1],
      },
    });
  })
  .on('end', async () => {
    // Read the song CSV file and insert the data into the database
    fs.createReadStream('songs.csv')
      .pipe(csv())
      .on('data', async (row) => {
        // Parse the data from the CSV row
        const artistIds = row[2].split(',');
        const popularity = parseInt(row[3], 10);
        let releaseDate;
        if (row[4].includes('-')) {
          releaseDate = new Date(row[4]);
        } else {
          releaseDate = new Date(`${row[4]}-01-01`);
        }

        // Insert the song into the database
        await prisma.song.create({
          data: {
            id: row[0],
            name: row[1],
            artist_ids: {
              connect: artistIds.map((id) => ({ id })),
            },
            popularity,
            releaseDate,
          },
        });
      })
      .on('end', async () => {
        // Close the database connection when the data has been inserted
        client.end();
        await prisma.$disconnect();
      });
  });
