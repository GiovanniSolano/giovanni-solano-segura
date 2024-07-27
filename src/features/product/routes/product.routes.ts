import { Router } from 'express';
import { ProductController, ProductBatchController } from '@features/product/controllers';
import { authenticateJWT } from '@features/auth/middlewares/auth.middleware';
import { ProductModule } from '@features/product/product.module';

const productService = ProductModule.getProductService();
const productBatchService = ProductModule.getProductBatchService();
const productController = new ProductController(productService);
const productBatchController = new ProductBatchController(productBatchService, productService);

const productRoutes = Router();

productRoutes.use(authenticateJWT);

// BATCH
productRoutes.post('/batch', (req, res) => productBatchController.createProductsBatch(req, res));
productRoutes.put('/batch', (req, res) => productBatchController.updateProductsBatch(req, res));
productRoutes.delete('/batch', (req, res) => productBatchController.deleteProductsBatch(req, res));

productRoutes.get('/', (req, res) => productController.getAllProducts(req, res));
productRoutes.post('/', (req, res) => productController.createProduct(req, res));
productRoutes.get('/:id', (req, res) => productController.getProductById(req, res));
productRoutes.put('/:id', (req, res) => productController.updateProduct(req, res));
productRoutes.delete('/:id', (req, res) => productController.deleteProduct(req, res));

export {
    productRoutes
};
