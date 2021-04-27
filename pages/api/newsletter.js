import fs from 'fs';
import path from 'path';

function getLocalData(fileName) {
  const filePath = path.join(process.cwd(), 'data', fileName);
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return { data, filePath };
}

function handler(req, res) {
  const { data, filePath } = getLocalData('newsletter.json');
  const email = req.body.email;

  if (req.method === 'POST') {
    if (!email || !email.includes('@')) {
      res.status(422).json({ error: 'Invalid email address' });
      return;
    }
    const newRegisteredUser = {
      id: new Date().toISOString(),
      email,
    };

    data.push(newRegisteredUser);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res
      .status(201)
      .json({ message: 'Successfully signed up!', data: newRegisteredUser });
  }
}

export default handler;
