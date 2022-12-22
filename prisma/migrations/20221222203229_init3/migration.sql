/*
  Warnings:

  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Artist";

-- DropTable
DROP TABLE "Song";

-- CreateTable
CREATE TABLE "song" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist_ids" INTEGER[],
    "popularity" INTEGER NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);
