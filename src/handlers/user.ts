import express, { Request, Response } from 'express';
import { User } from '../models/user';
import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import authenticationTokenVerification from '../middlewares/tokenAuthentication';

const store = new UserModel();
const createUser = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      username: req.body.username
    };

    const userCreated = await store.createUser(user);
    const token = jwt.sign({ user: userCreated }, process.env.TOKEN_SECRET as string);
    res.json({
      id: userCreated.id,
      first_name: userCreated.first_name,
      last_name: userCreated.last_name,
      token: token
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  const userDeleted = await store.deleteUser(req.body.id);
  res.json(userDeleted);
};
const selectAllUsers = async (_req: Request, res: Response) => {
  try {
    const allUsers = await store.selectAllUsers();
    res.json(allUsers);
  } catch (error) {
    res.status(400).send(error);
  }
};
const selectUser = async (req: Request, res: Response) => {
  const selectUser = await store.selectUser(req.body.id);
  res.json(selectUser);
};
const userRoutes = (app: express.Application) => {
  app.post('/users', createUser);
  app.delete('/users/:id', authenticationTokenVerification, deleteUser);
  app.get('/users', authenticationTokenVerification, selectAllUsers);
  app.get('/users/:id', authenticationTokenVerification, selectUser);
};
export default userRoutes;
