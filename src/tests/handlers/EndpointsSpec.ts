import supertest from 'supertest';
import app from '../../server';

const req = supertest(app);

describe('User Endpoints Test', () => {
  it('createUser() should create new user [token required]', async () => {
    const result = await req.post('/users').send({
      first_name: 'Mohammed',
      last_name: 'Nasif',
      username: 'Jr.Nasif',
      password: 'nasif@udacity'
    });
    expect(result.status).toBe(200);
  });
  it('deleteUser() should remove the user without [token required]', async () => {
    const result = await req.delete('/users/:id').send({
      first_name: 'Mohammed',
      last_name: 'Nasif',
      username: 'Jr.Nasif',
      password: 'nasif@udacity'
    });
    expect(result.status).toBe(401);
  });
  it('selectAllUsers() should return a list of All Users without [token required]', async () => {
    const res = await req.get('/users');
    expect(res.status).toBe(401);
  });
  it('selectUser() should return the Requird User without [token required]', async () => {
    const res = await req.get('/users/:id');
    expect(res.status).toBe(401);
  });
});

describe('Product Endpoints Test', () => {
  it('Test createProduct() Endpoint [token required]', async () => {
    const res = await req.post('/products');
    expect(res.status).toBe(401);
  });
  it('Test deleteProduct() Endpoint [token required]', async () => {
    const res = await req.delete('/products');
    expect(res.status).toBe(401);
  });
  it('Test selectAllProducts() Endpoint', async () => {
    const res = await req.get('/products');
    expect(res.status).toBe(200);
  });
  it('Test selectProduct() Endpoint', async () => {
    const res = await req.get('/products/:id');
    expect(res.status).toBe(200);
  });
});

describe('Orders Endpoints Test', () => {
  it('selectOrder() should Show A Specific Order [token required]', async () => {
    const res = await req.get('/orders/:id');
    expect(res.status).toBe(401);
  });
  it('addProduct() should add extra Product Order [token required]', async () => {
    const res = await req.get('/orders/:id/products');
    expect(res.status).toBe(404);
  });
});
