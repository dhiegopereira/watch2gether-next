import fs from 'fs';

export default async function handler(req, res) {
  const db = require('../../utils/db.json');
  switch (req.method) {
    case 'GET':
      res.status(200).json(db);
      break;
    case 'POST':
      db.push(req.body);
      console.log(db);
      await fs.writeFileSync("./utils/db.json", JSON.stringify(db));
      res.status(200).json({message: 'OK'}); 
      break;
    default: 
      res.status(200).json({ message: 'Tudo Ok!' });
  }
}