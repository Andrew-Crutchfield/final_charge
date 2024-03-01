import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { Payload } from '../types/index'; 

const tokenCheck = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  const tokenSecret: Secret = process.env.TOKEN_SECRET as Secret;

  try {
    const decoded = jwt.verify(token, tokenSecret) as Payload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(403);
  }
};

export default tokenCheck;