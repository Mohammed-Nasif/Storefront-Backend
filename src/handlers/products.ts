import express, { Request, Response } from 'express';
import { Product } from '../models/products';
import ProductModel from '../models/products';
import authenticationTokenVerification from '../middlewares/tokenAuthentication';

const store = new ProductModel();
const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };
    const productCreated = await store.createProduct(product);
    res.json(productCreated);
  } catch (error) {
    res.status(400).send(error);
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productDeleted = await store.deleteProduct(req.body.id);
    res.json(productDeleted);
  } catch (error) {
    res.status(400).send(error);
  }
};
const selectAllProducts = async (_req: Request, res: Response) => {
  try {
    const allProducts = await store.selectAllProducts();
    res.json(allProducts);
  } catch (error) {
    res.status(400).send(error);
  }
};
const selectProduct = async (req: Request, res: Response) => {
  try {
    const productSelected = await store.selectProduct(req.body.id);
    res.json(productSelected);
  } catch (error) {
    res.status(400).send(error);
  }
};
const productRoutes = (app: express.Application) => {
  app.post('/products', authenticationTokenVerification, createProduct);
  app.delete('/products', authenticationTokenVerification, deleteProduct);
  app.get('/products', selectAllProducts);
  app.get('/products/:id', selectProduct);
};
export default productRoutes;
