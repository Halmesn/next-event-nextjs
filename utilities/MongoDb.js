import { MongoClient } from 'mongodb';
import { Credentials } from 'credentials';

const { username, password } = Credentials.mongodbLogin;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@nextevent.rtmkh.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
};

export const insertDocument = async (collection, client, documents) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(documents);
  return result;
};

export const getAllDocument = async (collection, client, sort) => {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
};
