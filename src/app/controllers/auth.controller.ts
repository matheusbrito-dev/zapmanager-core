import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { validatePassword } from '../services/auth.service';
interface ISignIn {
  email: string;
  password: string;
}

export async function signIn(req: Request, res: Response) {
  try {
    const sign: ISignIn = req.body;
    const user = await User.findOneBy({ email: sign.email });
    if (user) {
      const isValid = await validatePassword(sign.password, user.password);
      if (isValid) {
        res.status(200).json({ message: 'User Logged' });
      } else {
        res.status(200).json({ message: 'Invalid password' });
      }
    } else {
      res.status(200).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error SignIn user: ', error);
    res.status(404).json({ message: 'Error SignIn user' });
  }
}
// export async function signOut(params: type) {}
// export async function authUser(params: type) {}
