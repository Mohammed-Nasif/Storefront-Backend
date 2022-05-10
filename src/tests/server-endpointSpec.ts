import supertest from 'supertest';
import app from '../server';

// Create A Request
const request = supertest(app);

describe('Test Server Endpoint Response.', () => {
  it('Get / endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
