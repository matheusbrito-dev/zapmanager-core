import { Request, Response } from 'express';
import { User } from '../models/user.model';

export async function createUser(req: Request, res: Response) {
  try {
    const newUser = await User.insert(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
}

export async function findUserById(req: Request, res: Response) {
  try {
    const user = await User.findOneBy({ id: Number(req.params.id) });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error find user', error });
  }
}

export async function findAll(req: Request, res: Response) {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ message: 'Error list users', error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findOneBy({ id: Number(req.params.id) });
    if (user) {
      await User.update({ id: user.id }, req.body);
      res.status(200).json({
        message: 'User updated successfully.',
      });
    } else {
      res.json({
        message: 'User not found.',
      });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error update user', error });
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
    res.status(400).json({ message: 'Error delete user', error });
  }
}
