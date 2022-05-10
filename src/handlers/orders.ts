import express, { Request, Response } from 'express';
import { Order, OrderedProduct } from '../models/orders';
import OrderModel from '../models/orders';
import authenticationTokenVerification from '../middlewares/tokenAuthentication';

const store = new OrderModel();
const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status as unknown as string,
      user_id: req.body.user_id as unknown as string
    };
    const orderCreated = await store.createOrder(order);
    res.json(orderCreated);
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderDeleted = await store.deleteOrder(req.body.id);
    res.json(orderDeleted);
  } catch (error) {
    res.status(400).send(error);
  }
};
const addProduct = async (req: Request, res: Response) => {
  const extraProduct: OrderedProduct = {
    user_id: req.body.user,
    order_id: req.params.id,
    product_id: req.body.product_id,
    quantity: req.body.quantity
  };
  try {
    const extraProductAdded = await store.addProduct(extraProduct);
    res.json(extraProductAdded);
  } catch (error) {
    res.status(400).send(error);
  }
};
const selectActiveOrders = async (req: Request, res: Response) => {
  try {
    const allActiveOrders = await store.selectActiveOrders();
    res.json(allActiveOrders);
  } catch (error) {
    res.status(400).send(error);
  }
};
const selectOrder = async (req: Request, res: Response) => {
  try {
    const selectedOrder = await store.selectOrder(req.body.id);
    res.json(selectedOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};
const orderRoutes = (app: express.Application) => {
  app.post('/orders', authenticationTokenVerification, createOrder);
  app.delete('/orders', authenticationTokenVerification, deleteOrder);
  app.post('/orders/:id/products', authenticationTokenVerification, addProduct);
  app.get('/orders', authenticationTokenVerification, selectActiveOrders);
  app.get('/orders/:id', authenticationTokenVerification, selectOrder);
};
export default orderRoutes;
