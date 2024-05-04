import { MongoClient } from 'mongodb';

// Connecting to MongoDB
export async function createConnection() {
  const MONGO_URL = "mongodb://localhost:27017/dbNxtWave/students";
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    console.log('MongoDB is connected!');
  } catch (err) {
    console.log(err.message);
  }
  return client;
}
