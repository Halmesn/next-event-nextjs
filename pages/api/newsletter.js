import { connectDatabase, insertDocument } from 'utilities/MongoDb';

async function handler(req, res) {
  const email = req.body.email;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connection to database failed' });
    return;
  }

  if (req.method === 'POST') {
    if (!email || !email.includes('@')) {
      res.status(422).json({ error: 'Invalid email address' });
      client.close();
      return;
    }

    try {
      await insertDocument('newsletter', client, { email });
      res.status(201).json({ message: 'Successfully signed up!' });
    } catch (error) {
      res.status(500).json({ error: 'Inserting data failed' });
    }
  }

  client.close();
}

export default handler;
