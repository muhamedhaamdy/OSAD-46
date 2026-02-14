const express = require('express');
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get('/', productController.getAllProducts);

productRouter.get('/:id', productController.getProduct);

productRouter.post('/', productController.addProduct);

productRouter.delete('/:id', productController.deleteProduct);

productRouter.patch('/:id', productController.editProduct);


module.exports = productRouter;