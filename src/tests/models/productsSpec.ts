import { Product } from '../../models/products';
import ProductModel from '../../models/products';

const store = new ProductModel();

describe('Product Model Test', () => {
  // Check If Methods Defined or not
  it('should have a create method [To Create New Product]', () => {
    expect(store.createProduct).toBeDefined();
  });
  it('should have a delete method [To Delete Specific Product]', () => {
    expect(store.deleteProduct).toBeDefined();
  });
  it('should have an index method [To Select All Products]', () => {
    expect(store.selectAllProducts).toBeDefined();
  });
  it('should have a show method [To Select Specific Product]', () => {
    expect(store.selectProduct).toBeDefined();
  });
  // Check The Expected Action Done  by Methods
  it('createProduct() should add a New Product', async () => {
    const product: Product = await store.createProduct({
      id: 1,
      name: 'H&M Shirt',
      price: 900
    });
    expect(product.id).toBe(product.id);
  });
  it('deleteProduct() should delete A Specific Product', async () => {
    const result = await store.deleteProduct(1);
    expect(result).toBeFalsy();
  });
  it('selectAllProducts() should return a list of All Available Products', async () => {
    const result = await store.selectAllProducts();
    expect(result.length).toBeGreaterThan(0); // Should Contains One or more Product
  });
  it('selectProduct() should return A Specific Product', async () => {
    const result = await store.selectProduct(1);
    expect(result).toBeFalsy();
  });
});
