import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: string;
};

export type OrderedProduct = {
  id?: number;
  quantity: number;
  user_id: number;
  order_id: string;
  product_id: string;
};

class OrderModel {
  // Create Order
  async createOrder(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [order.status, order.user_id]);
      const createdOrder = result.rows[0];
      conn.release();
      return createdOrder;
    } catch (error) {
      throw new Error(
        `Unable to create your order: (${order.status}), ${(error as Error).message}.`
      );
    }
  }
  // Delete Order
  async deleteOrder(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `DELETE FROM orders WHERE id=${order.id}`;
      const result = await conn.query(sql);
      const deletedOrder = result.rows[0];
      conn.release();
      return deletedOrder;
    } catch (error) {
      throw new Error(`Unable to delete your order: (${order.id}), ${(error as Error).message}.`);
    }
  }
  // Update Order
  async updateOrder(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `UPDATE orders set status=$1  WHERE id=$2 RETURNING * ;`;
      const result = await conn.query(sql, [order.status, order.id]);
      const updatedOrder = result.rows[0];
      conn.release();
      return updatedOrder;
    } catch (error) {
      throw new Error(`Unable to update your order: (${order.id}), ${(error as Error).message}.`);
    }
  }
  // Select All Active Orders
  async selectActiveOrders(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE id = (SELECT MAX(id) FROM orders WHERE status = 'active');`;
      const result = await conn.query(sql);
      const activeOrders = result.rows;
      conn.release();
      return activeOrders;
    } catch (error) {
      throw new Error(`Unable to select active orders, ${(error as Error).message}.`);
    }
  }
  // Select Specific Order
  async selectOrder(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE id=${order.id};`;
      const result = await conn.query(sql);
      const selectedOrder = result.rows[0];
      conn.release();
      return selectedOrder;
    } catch (error) {
      throw new Error(`Unable to select order: ${order.id}, ${(error as Error).message}.`);
    }
  }
  // Add Prdouct To Order
  async addProduct(addProd: OrderedProduct): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        addProd.quantity,
        addProd.order_id,
        addProd.product_id
      ]);
      const addedProduct = result.rows[0];
      conn.release();
      return addedProduct;
    } catch (error) {
      throw new Error(
        `Unable to add this product  ${addProd.product_id} to your order ${addProd.order_id}, ${
          (error as Error).message
        }.`
      );
    }
  }
}

export default OrderModel;
