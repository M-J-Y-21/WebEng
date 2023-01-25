#!/bin/sh
npx prisma db push
npx prisma db seed

npx prisma studio &
npm run start
