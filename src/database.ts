import { Pool } from 'pg';
import dotenv from 'dotenv';

// initializes the environment variables
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV,
  POSTGRES_DB_TEST
} = process.env; // Get them from .env file

const Client = new Pool({
  //parameters needed inorder to connect to database
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST, // Check if ENV Is For dev or test
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string)
});

Client.on('error', (error: Error) => {
  console.log(error.message);
});

export default Client;
