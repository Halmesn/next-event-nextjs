import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASS_WORD}@nextevent.rtmkh.mongodb.net/events?retryWrites=true&w=majority`,
    { useUnifiedTopology: true }
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
