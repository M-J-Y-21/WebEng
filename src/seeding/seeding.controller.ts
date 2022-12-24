import { Controller, Get } from '@nestjs/common';

const fs = require('fs');
const fastcsv = require('fast-csv');
const Pool = require('pg').Pool;
const { PrismaClient } = require('@prisma/client');

@Controller('seed')
export class SeedingController {
  @Get()
  async seed(): Promise<void> {
    console.log('Seeding database...');

    // seed songs

    let streamSongs = fs.createReadStream('songs.csv');
    let csvDataSongs = [];
    let csvStreamSongs = fastcsv
      .parse()
      .on('data', function (data) {
        csvDataSongs.push(data);
      })
      .on('end', function () {
        // remove the first line: header
        csvDataSongs.shift();

        // create a new connection pool to the database
        const pool = new Pool({
          host: 'localhost',
          user: 'postgres',
          database: 'nest',
          password: '123',
          port: 5434,
        });

        let querySongs =
          'INSERT INTO "Song" (id, name, artist_ids, popularity, release_date) VALUES ($1, $2, temp, $4, $5)';
        console.log(querySongs);

        // ['3BiJGZsyX9sJchTqcSA7Su', '58wzyK6DupVsypvs3QV2Fo', '6lXiGaWjISZnER53ZJe6QO']
        // {'3BiJGZsyX9sJchTqcSA7Su', '58wzyK6DupVsypvs3QV2Fo', '6lXiGaWjISZnER53ZJe6QO'}
        let arrayString : String;
        pool.connect((err, client, done) => {
          if (err) throw err;
          try {
            csvDataSongs.forEach((row) => {
              arrayString = row[2]
                .toString()
                .replace(/\[/g, '{')
                .replace(/\]/g, '}');
              // console.log("arrayString: " + arrayString);
              querySongs = querySongs.replace('temp', arrayString.toString());
              // console.log("querySongs: " + querySongs);
              client.query(querySongs, row, (err, res) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  console.log('inserted ' + res.rowCount + ' row:', row);
                }
              });
            });
          } finally {
            done();
            console.log('Seeded songs!');
          }
        });
      });
    streamSongs.pipe(csvStreamSongs);

    // for artists

    let streamArtists = fs.createReadStream('artists.csv');
    let csvDataArtists = [];
    let csvStreamArtists = fastcsv
      .parse()
      .on('data', function (data) {
        csvDataArtists.push(data);
      })
      .on('end', function () {
        // remove the first line: header
        csvDataArtists.shift();
        console.log(csvDataArtists.length);

        // create a new connection pool to the database
        const pool = new Pool({
          host: 'localhost',
          user: 'postgres',
          database: 'nest',
          password: '123',
          port: 5434,
        });

        const queryArtists = 'INSERT INTO "Artist" (id, name) VALUES ($1, $2)';

        pool.connect((err, client, done) => {
          if (err) throw err;
          try {
            csvDataArtists.forEach((row) => {
              client.query(queryArtists, row, (err, res) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  console.log('inserted ' + res.rowCount + ' row:', row);
                }
              });
            });
          } finally {
            done();
            console.log('Seeded artists!');
          }
        });
      });
    streamArtists.pipe(csvStreamArtists);
    console.log('Seeding fully complete!');

    /*
    // seed songs
    fs.createReadStream('songs.csv')
      .pipe(csv())
      .on('data', async (row) => {
        await prisma.user.create({ data: row });
      })
      .on('end', () => {
        console.log('Seeding complete!');
        prisma.disconnect();
      });
      
    // seed artists
    fs.createReadStream('artists.csv')
      .pipe(csv())
      .on('data', async (row) => {
        await prisma.user.create({ data: row });
      })
      .on('end', () => {
        console.log('Seeding complete!');
        prisma.disconnect();
      });
      */
  }
}
