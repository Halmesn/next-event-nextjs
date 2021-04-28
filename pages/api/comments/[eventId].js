import {
  connectDatabase,
  insertDocument,
  getAllDocument,
} from 'utilities/MongoDb';

async function handler(req, res) {
  const { eventId } = req.query;
  const { email, name, text } = req.body;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connection to database failed' });
    return;
  }

  if (req.method === 'POST') {
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ error: 'Invalid input.' });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email,
      name,
      text,
    };

    try {
      const result = await insertDocument('comments', client, newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'comment added!', comment: newComment });
    } catch (error) {
      res.status(500).json({ error: 'Inserting comment failed' });
    }
  }

  if (req.method === 'GET') {
    let documents;

    try {
      documents = await getAllDocument('comments', client, { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ error: 'Getting comments failed' });
    }
  }

  client.close();
}

export default handler;
