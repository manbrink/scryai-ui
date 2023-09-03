// Avoid instantiating too many instances of Prisma in development
// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices#problem

import { Pool } from 'pg';

let pgClient: typeof Pool;

interface CustomGlobal extends Global {
  pgClient: typeof Pool;
}

declare const global: CustomGlobal;

if (process.env.NODE_ENV === "production") {
  pgClient = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'mtg',
    password: process.env.DB_PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  if (!global.pgClient) {
    global.pgClient = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: 'mtg',
      password: process.env.DB_PASSWORD,
      port: 5432,
      ssl: {
        rejectUnauthorized: false
      }
    });
  }
  pgClient = global.pgClient;
}

export default pgClient;