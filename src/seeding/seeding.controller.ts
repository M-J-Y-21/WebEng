import { Controller, Get } from '@nestjs/common';

const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

@Controller('seed')
export class SeedingController {
  @Get()
  async seed(): Promise<void> {
    
    console.log('Seeding database...');
    
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
  }
}