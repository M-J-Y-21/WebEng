import { Controller, Get } from '@nestjs/common';

const fs = require('fs');
const Artist = require("pg").Artist;
const Song = require("pg").Song;
const fastcsv = require('fast-csv');
const Pool = require("pg").Pool;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

@Controller('seed')
export class SeedingController {
  @Get()
  async seed(): Promise<void> {
    
    console.log('Seeding database...');
    
    // seed songs
    
    let stream = fs.createReadStream("songs.csv");
    let csvData = [];
    let csvStreamSongs = fastcsv
      .parse()
      .on("data", function (data) {
        csvData.push(data);
      })
      .on("end", function () {
        // remove the first line: header
        csvData.shift();

        // create a new connection pool to the database
        const pool = new Pool({
          host: "localhost",
          user: "postgres",
          database: "nest",
          password: "123",
          port: 5434
        });

        const query =
          "INSERT INTO song (id, name, artist_ids, popularity, release_date) VALUES ($1, $2, $3, $4, $5)";

        pool.connect((err, client, done) => {
          if (err) throw err;
          try {
            csvData.forEach(row => {
              client.query(query, row, (err, res) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  console.log("inserted " + res.rowCount + " row:", row);
                }
              });
            });
          } finally {
            done();
          }
        });
        
        console.log('Seeded songs!');
      });
    stream.pipe(csvStreamSongs);

    // for artists

    let streamArtists = fs.createReadStream("artists.csv");
    let csvDataArtists = [];
    let csvStreamArtists = fastcsv
      .parse()
      .on("data", function (data) {
        csvDataArtists.push(data);
      })
      .on("end", function () {
        // remove the first line: header
        csvData.shift();

        // create a new connection pool to the database
        const pool = new Pool({
          host: "localhost",
          user: "postgres",
          database: "nest",
          password: "123",
          port: 5434
        });

        const query =
          "INSERT INTO artist (id, name) VALUES ($1, $2)";

        pool.connect((err, client, done) => {
          if (err) throw err;
          try {
            csvData.forEach(row => {
              client.query(query, row, (err, res) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  console.log("inserted " + res.rowCount + " row:", row);
                }
              });
            });
          } finally {
            done();
          }
        });

        console.log('Seeded artists!');
      });
    stream.pipe(csvStreamArtists);

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