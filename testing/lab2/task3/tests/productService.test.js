const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Product = require('../src/models/Product');
const ProductService = require('../src/services/productService');

let mongoServer;
let productService;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  productService = new ProductService(Product);
});

afterEach(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('ProductService.createProduct', () => {
  it('creates a product with correct fields', async () => {
    const data = { name: 'Laptop', slug: 'laptop-pro', price: 999 };

    const product = await productService.createProduct(data);

    expect(product.name).toBe('Laptop');
    expect(product.slug).toBe('laptop-pro');
    expect(product.inStock).toBe(true);
  });

  it('throws error if slug is duplicated', async () => {
    await Product.create({ name: 'Phone X', slug: 'phone-x', price: 500 });

    await expect(productService.createProduct({ name: 'Other Phone', slug: 'phone-x', price: 600 }))
      .rejects.toThrow('Slug already in use');
  });

  it('throws error if price is negative', async () => {
    const data = { name: 'Free Item', slug: 'free', price: -10 };

    await expect(productService.createProduct(data)).rejects.toThrow();
  });
});

describe('ProductService.getAvailableProducts', () => {
  it('returns only in-stock products', async () => {
    await Product.create({ name: 'In Stock', slug: 'in', price: 10, inStock: true });
    await Product.create({ name: 'Out of Stock', slug: 'out', price: 20, inStock: false });

    const result = await productService.getAvailableProducts();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('In Stock');
  });
});

describe('ProductService.discontinue', () => {
  it('sets inStock to false', async () => {
    await Product.create({ name: 'Book', slug: 'book-1', price: 5 });

    const product = await productService.discontinue('book-1');

    expect(product.inStock).toBe(false);
  });

  it('throws error for unknown slug', async () => {
    await expect(productService.discontinue('no-such-slug')).rejects.toThrow('Product not found');
  });
});
