import UserModel from '../../models/user';
import ProductModel from '../../models/products';
import OrderModel from '../../models/orders';

const userModel = new UserModel();
const orderModel = new OrderModel();
const productModel = new ProductModel();

describe('Order Model Test', () => {
  beforeAll(async () => {
    await userModel.createUser({
      first_name: 'Mohammed',
      last_name: 'Nasif',
      username: 'Jr.Nasif',
      password: 'nasif@udacity'
    });

    await productModel.createProduct({
      id: 1,
      name: 'H&M Shirt',
      price: 900
    });
  });

  // Check If Methods Defined or not
  it('should have a create method [To Create New Order]', () => {
    expect(orderModel.createOrder).toBeDefined();
  });
  it('should have a delete method [To Delete/Cancel Order]', () => {
    expect(orderModel.deleteOrder).toBeDefined();
  });
  it('should have a index method [To Show all Active Orders]', () => {
    expect(orderModel.selectActiveOrders).toBeDefined();
  });
  it('should have a show method [To Show A Specific Order]', () => {
    expect(orderModel.selectOrder).toBeDefined();
  });
  // Check The Expected Action Done  by Methods
  it('createOrder() should Create New Active Order', async () => {
    const result = await orderModel.createOrder({
      user_id: '1',
      status: 'active'
    });
    expect(result).toEqual({
      id: result.id,
      user_id: '1',
      status: 'active'
    });
  });
});
