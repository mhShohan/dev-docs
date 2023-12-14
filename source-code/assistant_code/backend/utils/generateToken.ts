import jwt from 'jsonwebtoken';
import config from '../app/config';
import { Types } from 'mongoose';

const generateToken = (data: { _id: Types.ObjectId; email: string }) => {
  return jwt.sign(data, config.jwt_secret!, { expiresIn: '7d' });
};

export default generateToken;
