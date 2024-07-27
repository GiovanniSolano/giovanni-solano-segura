import { Response } from 'express';
import { ProductBatchService, ProductService } from '@features/product/services';
import { handleError, handleValidationError, ResponseUtil } from '@shared/utils';
import { ProductMapper } from '@features/product/mappers';
import { CreateProductDto, createProductsBatchSchema, deleteProductsBatchSchema, UpdateProductDto, updateProductsBatchSchema } from '@features/product/dto/request';
import { AuthenticatedRequest } from '@shared/interfaces';
import { HttpStatusCode } from '@shared/constants';
import { ProductResumeDto } from '@features/product/dto/response';
import { CatalogProductEntity } from '@features/product/entities';

/**
 * ProductBatchController
 * Handles requests related to product batch operations.
 */
export class ProductBatchController {

  /**
   * Creates an instance of ProductBatchController.
   * @param {ProductBatchService} productBatchService - Service for managing product batch operations.
   * @param {ProductService} productService - Service for managing individual product operations.
   */
  constructor(
    private productBatchService: ProductBatchService,
    private productService: ProductService
  ) {}

  /**
   * Handles POST requests to create multiple products in batch.
   * @param {AuthenticatedRequest} req - The request object containing authenticated user info and product data.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async createProductsBatch(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {

      const { error, value } = createProductsBatchSchema.validate(req.body.products);

      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }

      const products: CreateProductDto[] = value;

      const productsToCreate = products.map(dto => {
        const product = new CatalogProductEntity(dto);
        product.createdBy = req.user.sub;
        return product;
      });

      const createdProducts = await this.productBatchService.createBatch(productsToCreate);

      const productResumeDtos: ProductResumeDto[] = ProductMapper.toProductResumeDtoList(createdProducts);

      return ResponseUtil.toSuccessResponse(res, { products: productResumeDtos }, 'Products created successfully', HttpStatusCode.CREATED);
    } catch (error) {
      return handleError(res, error, 'Failed to create products');
    }
  }

  /**
   * Handles PUT requests to update multiple products in batch.
   * @param {AuthenticatedRequest} req - The request object containing authenticated user info and update data.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async updateProductsBatch(req: AuthenticatedRequest, res: Response): Promise<void> {
    
    try {

      const { error, value } = updateProductsBatchSchema.validate(req.body.products);
  
      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }
  
      const productsDto: UpdateProductDto[] = value;
      const updatedProducts: CatalogProductEntity[] = [];
  
      const productIds: string[] = productsDto.map(dto => dto.id as string);
      const existingProducts = await this.productService.findByIds(productIds);
  
      const productMap = new Map(existingProducts.map(product => [product.id, product]));
  
      for (const productDto of productsDto) {

        if(!productDto.id) {
          continue;
        }

        const product = productMap.get(productDto.id);
  
        if (!product) {
          return ResponseUtil.toErrorResponse(res, `Product with ID ${productDto.id} not found`, '', HttpStatusCode.NOT_FOUND);
        }
  
        product.fill(productDto);
        product.updatedBy = req.user.sub;
        product.updatedAt = new Date();
        
        updatedProducts.push(product);
      }
  
      await this.productBatchService.updateBatch(updatedProducts);
  
      const productResumeDtos: ProductResumeDto[] = ProductMapper.toProductResumeDtoList(updatedProducts);
  
      return ResponseUtil.toSuccessResponse(res, productResumeDtos, 'Products updated successfully');
    } catch (error) {
      return handleError(res, error, 'Failed to update products');
    }
  }

  /**
   * Handles DELETE requests to delete multiple products in batch.
   * @param {AuthenticatedRequest} req - The request object containing authenticated user info and product IDs to delete.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async deleteProductsBatch(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {

      const { error, value } = deleteProductsBatchSchema.validate(req.body.products);

      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }

      const ids: string[] = value;
      const products = await this.productService.findByIds(ids);

      if (products.length === 0) {
        return ResponseUtil.toErrorResponse(res, 'No products found to delete', '', HttpStatusCode.NOT_FOUND);
      }

      for (const product of products) {
        product.deletedAt = new Date();
        product.deletedBy = req.user.sub;
      }

      await this.productBatchService.deleteBatch(products);
      
      const productResumeDtos: ProductResumeDto[] = ProductMapper.toProductResumeDtoList(products);

      return ResponseUtil.toSuccessResponse(res, { products: productResumeDtos }, 'Products deleted successfully');
    } catch (error) {
      return handleError(res, error, 'Failed to delete products');
    }
  }
}
