import { Request, Response } from 'express';
import { User } from '../models/user.model';
import {
  createToken,
  decodeToken,
  gererateRefreshToken,
  validatePassword,
} from '../services/auth.service';
import { ISignIn } from '../interfaces/auth.interface';
import { RefreshToken } from '../models/refreshToken.model';

export async function signIn(req: Request, res: Response) {
  try {
    const signBody: ISignIn = req.body;
    const user = await User.findOneBy({ email: signBody.email });
    if (!user) {
      res.status(200).json({ message: 'User or password incorrect' });
    }
    const isValid = await validatePassword(signBody.password, user.password);
    if (!isValid) {
      res.status(200).json({ message: 'User or password incorrect' });
    }
    await gererateRefreshToken(user);
    const token = createToken(user.id);
    res.status(200).json({ message: 'User Logged', token });
  } catch (error) {
    console.error('Error SignIn user: ', error);
    res.status(404).json({ message: 'Error SignIn user' });
  }
}
export async function signOut(req: Request, res: Response) {
  try {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({ message: 'Unauthorized Access' });
    }
    const [, token] = authToken.split(' ');
    const userId = Number(decodeToken(token));
    await RefreshToken.delete({ user: { id: userId } });
    res.status(200).json({ message: 'User logout success' });
  } catch (error) {
    console.error('Error SignIn user: ', error);
    res.status(404).json({ message: 'Error SignIn user' });
  }
}

// export async function saveRefreshToken(token: string, userId: number) {
//   const userHasToken = await RefreshToken.findOneBy({ user: { id: userId } });
//   if (userHasToken) {
//     await RefreshToken.update({ uuid: userHasToken.uuid }, {});
//   }
// }

// export async function authUser(params: type) {}
