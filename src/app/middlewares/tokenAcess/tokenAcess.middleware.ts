import { NextFunction, Request, Response } from 'express';
import {
  validadeToken,
  decodeToken,
  verifyRefreshTokenExpired,
  createToken,
} from '../../services/auth.service';

export async function tokenAcess(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized Access' });
  }
  const [, token] = authToken.split(' ');

  const tokenValid = validadeToken(token);
  if (tokenValid) {
    return next();
  }

  const userId = Number(decodeToken(token));
  const refreshTokenExpired = await verifyRefreshTokenExpired(userId);
  if (!refreshTokenExpired) {
    const newToken = createToken(userId);
    res.setHeader('Authorization', 'Bearer ' + newToken);
    return next();
  }
  res.status(401).json({ message: 'Token expired sign in again' });
}
