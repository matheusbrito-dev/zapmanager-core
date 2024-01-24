import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { IUserCreateRequest, IUserRequest } from '../interfaces/user.interface';
import { encryptPassword } from '../services/auth.service';

export async function createUser(req: IUserCreateRequest, res: Response) {
  try {
    let user: IUserRequest = req.body;
    console.log(user);
    const userExists = await User.findOneBy({ email: user.email });
    if (userExists) {
      res.status(200).json({ message: 'User already exists' });
    } else {
      user = {
        ...user,
        password: await encryptPassword(user.password),
      };
      await User.insert(user);
      res.status(200).json({ message: 'New user created' });
    }
  } catch (error) {
    console.log('Error create user: ', error);
    res.status(400).json({ message: 'Error create user' });
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    const user = await User.findOneBy({ id: Number(req.params.id) });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error find user: ', error);
    res.status(400).json({ message: 'Error find user' });
  }
}

export async function findAll(req: Request, res: Response) {
  try {
    const allUsers = await User.find();
    if (allUsers.length) {
      res.status(200).json(allUsers);
    } else {
      res.status(200).json({ message: 'The search reach none user' });
    }
  } catch (error) {
    console.error('Error list users: ', error);
    res.status(400).json({ message: 'Error list users' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findOneBy({ id: Number(req.params.id) });
    if (user) {
      let newUser: IUserRequest = req.body;
      newUser = {
        ...newUser,
        password: await encryptPassword(user.password),
      };
      await User.update({ id: user.id }, newUser);
      res.status(200).json({
        message: 'User updated successfully.',
      });
    } else {
      res.json({
        message: 'User not found.',
      });
    }
  } catch (error) {
    console.error('Error update user: ', error);
    res.status(400).json({ message: 'Error update user' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const user = await User.findOneBy({ id: Number(req.params.id) });
    if (user) {
      await User.delete(req.params.id);
      res.status(200).json({
        message: 'User deleted successfully.',
      });
    } else {
      res.json({
        message: 'User not found.',
      });
    }
  } catch (error) {
    console.error('Error delete user: ', error);
    res.status(400).json({ message: 'Error delete user' });
  }
}
