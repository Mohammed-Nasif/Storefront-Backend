import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

class ProductModel {
  // Create Product
  async createProduct(prod: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [prod.name, prod.price]);
      const createdProduct = result.rows[0];
      conn.release();
      return createdProduct;
    } catch (error) {
      throw new Error(`Unable to create product: (${prod.name}), ${(error as Error).message}.`);
    }
  }
  // Update Product
  async updateProduct(prod: Product): Promise<Product> {
    try {
      const sql = `UPDATE products set name=$1 ,price=$2 WHERE id=$3 RETURNING *;`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [prod.name, prod.price, prod.id]);
      const updatedProduct = result.rows[0];
      conn.release();
      return updatedProduct;
    } catch (error) {
      throw new Error(`Unable to Update product: (${prod.name}), ${(error as Error).message}.`);
    }
  }
  // Delete Product
  async deleteProduct(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM products WHERE id=$1`;
      const result = await conn.query(sql, [id]);
      const deletedProduct = result.rows[0];
      conn.release();
      return deletedProduct;
    } catch (error) {
      throw new Error(`Unable to delete product with id: (${id}), ${(error as Error).message}.`);
    }
  }
  // Select All Products
  async selectAllProducts(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products;';
      const result = await conn.query(sql);
      const allProducts = result.rows;
      conn.release();
      return allProducts;
    } catch (error) {
      throw new Error(`Unable to get products, ${(error as Error).message}.`);
    }
  }
  // Select One Product
  async selectProduct(id: number): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE id=$1;`;
      const result = await conn.query(sql, [id]);
      const selectedProduct = result.rows[0];
      conn.release();
      return selectedProduct;
    } catch (error) {
      throw new Error(`Unable to get product with id: (${id}), ${(error as Error).message}.`);
    }
  }
}

export default ProductModel;
