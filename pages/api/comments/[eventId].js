import fs from 'fs';
import path from 'path';

function getLocalData(fileName) {
  const filePath = path.join(process.cwd(), 'data', fileName);
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return { data, filePath };
}

function handler(req, res) {
  const { data, filePath } = getLocalData('comments.json');
  const { eventId } = req.query;
  const { email, name, text } = req.body;

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
      return;
    }

    const newComment = {
      _id: eventId,
      email,
      name,
      text,
    };

    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: 'comment added!', data: newComment });
  }
  if (req.method === 'GET') {
    const eventComments = data.filter((comment) => comment._id === eventId);
    res.status(200).json({ comments: eventComments });
  }
}

export default handler;
