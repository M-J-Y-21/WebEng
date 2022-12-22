/*
  Warnings:

  - You are about to drop the column `popularity` on the `Artist` table. All the data in the column will be lost.
  - You are about to drop the column `artistIDs` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the `_ArtistToSong` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `release_date` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Made the column `popularity` on table `Song` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToSong" DROP CONSTRAINT "_ArtistToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToSong" DROP CONSTRAINT "_ArtistToSong_B_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP COLUMN "popularity";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "artistIDs",
DROP COLUMN "title",
DROP COLUMN "year",
ADD COLUMN     "artist_ids" INTEGER[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "popularity" SET NOT NULL;

-- DropTable
DROP TABLE "_ArtistToSong";
