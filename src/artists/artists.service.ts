import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class ArtistsService {
  async getSongsByArtist(idOrName: string): Promise<Song[]> {
    // First one get all songs of artist given an artist Id
    // right now flawed as will only work I think if that song
    // has only that one artist Id but if it has two including that one
    // I think it'll fail check? Yes this it true
    // has below solves issue
    let songs = [];
    const songsById = await prisma.song.findMany({
      where: {
        artist_ids: {
          has: idOrName,
        },
      },
    });
    if (songsById.length > 0) {
      return songsById;
    }
    /**
     * If the idOrName is not an id, it is a name.
     * Find the first artist by the matching name
     * and return the songs by id.
     * Better solution return songs of all artists with matching name.
     * Did that below.
     */
    const idArtistByName = await prisma.artist.findMany({
      where: {
        name: idOrName,
      },
    });
    console.log(idArtistByName);
    if (idArtistByName.length > 0) {
      const artistIds = idArtistByName
        .map((artist) => artist.id)
        .map((id) => id.toString());

      for (let index = 0; index < artistIds.length; index++) {
        songs.push(
          await prisma.song.findMany({
            where: {
              artist_ids: { equals: artistIds[index] },
            },
          }),
        );
        console.log(songs);
      }
      return songs;

      // const songsByName = await prisma.song.findMany({
      //   where: {
      //     artist_ids: { equals: artistIds },
      //   },
      // });
      // console.log(songsByName);
      // return songsByName;
    }
  }
}

// to retrieve or delete all songs for a specific artist by artist ID or artist
// name;

//   async deleteSongsByArtist(idOrName: string): Promise<void> {
//     // First one delete all songs of artist given an artist Id
//     const songsById = await prisma.song.findMany({
//       where: {
//         artist_ids: {
//           equals: idOrName,
//         },
//       },
//     });
//     if (songsById.length > 0) {
//       songsById.forEach(async song => {
//         await prisma.song.delete({
//           where: {
//             id: song.id,
//           },
//         });
//       });
//       return;
//     }
//     const artists = await prisma.artist.findMany({
//       where: {
//         name: idOrName,
//       },
//     });
//     if (artists.length > 0) {
//       const artistIds = artists.map(artist => artist.id);
//       const songsByName = await prisma.song.findMany({
//         where: {
//           artist_ids: {
//             in: artistIds.map(id => ({ equals: id })),
//           },
//         },
//       });
//       songsByName.forEach(async song => {
//         await prisma.song.delete({
//           where: {

// }
