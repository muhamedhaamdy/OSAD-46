class ProductService {
  constructor(ProductModel) {
    this.Product = ProductModel;
  }

  async createProduct(data) {
    const existing = await this.Product.findOne({ slug: data.slug });
    if (existing) throw new Error('Slug already in use');
    return this.Product.create(data);
  }

  async getAvailableProducts() {
    return this.Product.find({ inStock: true }).lean();
  }

  async discontinue(slug) {
    const product = await this.Product.findOneAndUpdate(
      { slug },
      { inStock: false },
      { new: true }
    );
    if (!product) throw new Error('Product not found');
    return product;
  }
}

module.exports = ProductService;
