import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticateJWT } from '@features/auth/middlewares/auth.middleware';
import { ProductModule } from '@features/product/product.module';

const productService = ProductModule.getProductService();
const productController = new ProductController(productService);

const productRoutes = Router();

productRoutes.use(authenticateJWT);

productRoutes.get('/', (req, res) => productController.getAllProducts(req, res));
productRoutes.post('/', (req, res) => productController.createProduct(req, res));
productRoutes.get('/:id', (req, res) => productController.getProductById(req, res));
productRoutes.put('/:id', (req, res) => productController.updateProduct(req, res));
productRoutes.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export {
    productRoutes
};
