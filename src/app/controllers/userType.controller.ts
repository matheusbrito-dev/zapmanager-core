import { Request, Response } from 'express';
import { IUserType } from '../interfaces/userType.interface';
import { UserType } from '../models/userType.model';

export async function createUserType(req: Request, res: Response) {
  try {
    const userType: IUserType = req.body;
    const typeExists = await UserType.findOneBy({ type: userType.type });
    if (typeExists) {
      res.status(200).json({ message: 'Type already exists' });
    } else {
      await UserType.insert(userType);
      res.status(200).json({ message: 'New Type created' });
    }
  } catch (error) {
    console.error('Error create Type: ', error);
    res.status(400).json({ message: 'Error create Type' });
  }
}

export async function findAll(req: Request, res: Response) {
  try {
    const types = await UserType.find();
    if (types.length) {
      res.status(200).json(types);
    } else {
      res.status(200).json({ message: 'The search reach none types' });
    }
  } catch (error) {
    console.error('Error list types: ', error);
    res.status(400).json({ message: 'Error list types' });
  }
}

export async function updateUserType(req: Request, res: Response) {
  try {
    const typeExists = await UserType.findOneBy({ id: Number(req.params.id) });
    if (typeExists) {
      const newType: IUserType = req.body;
      await UserType.update({ id: typeExists.id }, newType);
      res.status(200).json({
        message: 'Type updated successfully.',
      });
    } else {
      res.json({
        message: 'Type not found.',
      });
    }
  } catch (error) {
    console.error('Error update Type: ', error);
    res.status(400).json({ message: 'Error update Type' });
  }
}

export async function deleteUserType(req: Request, res: Response) {
  try {
    const typeExists = await UserType.findOneBy({ id: Number(req.params.id) });
    if (typeExists) {
      await UserType.delete(req.params.id);
      res.status(200).json({
        message: 'Type deleted successfully.',
      });
    } else {
      res.json({
        message: 'Type not found.',
      });
    }
  } catch (error) {
    console.error('Error delete Type: ', error);
    res.status(400).json({ message: 'Error delete Type' });
  }
}
