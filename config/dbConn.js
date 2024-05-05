import { MongoClient } from 'mongodb';

// Connecting to MongoDB
export async function createConnection() {
  const MONGO_URL = "mongodb+srv://giabao20924:20092004@cluster0.6bcasrs.mongodb.net/Dashboard";
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    console.log('MongoDB is connected!');
  } catch (err) {
    console.log(err.message);
  }
  return client;
}
