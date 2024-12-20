import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import User from '../../server/models/user';
//import User from '../../server/models/user.model';

mongoose.connect('mongodb://127.0.0.1:27017/WorldCityUser', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await User.find();
    res.status(200).json(users);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
