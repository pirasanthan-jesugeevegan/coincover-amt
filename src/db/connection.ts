import { Client } from 'pg';

export default async function connectToDatabase() {
  const client = new Client({
    user: 'postgres',
    host: 'database-2.chnpi5vapm4u.us-east-1.rds.amazonaws.com',
    password: 'postgres',
    port: 5432,
  });

  await client.connect();

  return client;
}
