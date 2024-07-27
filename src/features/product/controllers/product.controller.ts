import { Request, Response } from 'express';
import { ProductService } from '@features/product/services';
import { ResponseUtil, handleValidationError, handleError } from '@shared/utils';
import {
  CreateProductDto,
  createProductSchema,
  deleteProductSchema,
  getProductByIdSchema,
  UpdateProductDto,
  updateProductSchema
} from '@features/product/dto/request';
import { HttpStatusCode } from '@shared/constants';
import { CatalogProductEntity } from '@features/product/entities';
import { ProductResumeDto } from '@features/product/dto/response';
import { ProductMapper } from '@features/product/mappers';
import { AuthenticatedRequest } from '@shared/interfaces';
import { paginationSchema, PaginationDto } from '@shared/dto/request';

/**
 * ProductController
 * Handles requests related to product operations.
 */
export class ProductController {

  /**
   * Creates an instance of ProductController.
   * @param {ProductService} productService - Service for managing product operations.
   */
  constructor(private productService: ProductService) {}

  /**
   * Handles GET requests to fetch all products.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async getAllProducts(req: Request, res: Response): Promise<void> {

    try {

      const { error, value } = paginationSchema.validate(req.query);

      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }

      const { page, limit }: PaginationDto = value;      

      const { products, totalCount } = await this.productService.getAll(page, limit);

      const productResumeDtos: ProductResumeDto[] = ProductMapper.toProductResumeDtoList(products);

      return ResponseUtil.toSuccessResponse(res, { products: productResumeDtos, count: totalCount, page, limit }, 'Products fetched successfully');
    } catch (error) {
      return handleError(res, error, 'Failed to fetch products');
    }
  }

  /**
   * Handles POST requests to create a new product.
   * @param {AuthenticatedRequest} req - The request object containing authenticated user info.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async createProduct(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {

      const { error, value } = createProductSchema.validate(req.body);

      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }

      const createProductDto: CreateProductDto = value;
      createProductDto.createdBy = req.user.sub;
      const newProduct: CatalogProductEntity = new CatalogProductEntity(createProductDto);

      const product: CatalogProductEntity = await this.productService.create(newProduct);

      const productResumeDto: ProductResumeDto = ProductMapper.toProductResumeDto(product);

      return ResponseUtil.toSuccessResponse(res, { product: productResumeDto }, 'Product created successfully', HttpStatusCode.CREATED);
    } catch (error) {
      return handleError(res, error, 'Failed to create product');
    }
  }

  /**
   * Handles GET requests to fetch a product by its ID.
   * @param {Request} req - The request object containing the product ID in parameters.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async getProductById(req: Request, res: Response): Promise<void> {

    try {

      const { id } = req.params;
      const { error } = getProductByIdSchema.validate({ id });

      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }

      const product = await this.productService.getOneById(id);

      if (!product) {
        return ResponseUtil.toErrorResponse(res, 'Product not found', '', HttpStatusCode.NOT_FOUND);
      }

      const productResumeDto: ProductResumeDto = ProductMapper.toProductResumeDto(product);

      return ResponseUtil.toSuccessResponse(res, { product: productResumeDto }, 'Product fetched successfully');
    } catch (error) {
      return handleError(res, error, 'Failed to fetch product');
    }
  }

  /**
   * Handles PUT requests to update an existing product.
   * @param {AuthenticatedRequest} req - The request object containing authenticated user info and product data.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async updateProduct(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {

      const { id } = req.params;
      const updateProductDto: UpdateProductDto = req.body;
      const { error } = updateProductSchema.validate({ ...updateProductDto, id });

      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }

      const product = await this.productService.getOneById(id);

      if (!product) {
        return ResponseUtil.toErrorResponse(res, 'Product not found', '', HttpStatusCode.NOT_FOUND);
      }

      product.fill(updateProductDto);
      product.updatedBy = req.user.sub;
      product.updatedAt = new Date();
      const updatedProduct = await this.productService.update(product);

      const productResumeDto: ProductResumeDto = ProductMapper.toProductResumeDto(updatedProduct);

      return ResponseUtil.toSuccessResponse(res, { product: productResumeDto }, 'Product updated successfully');
    } catch (error) {
      return handleError(res, error, 'Failed to update product');
    }
  }

  /**
   * Handles DELETE requests to delete a product.
   * @param {AuthenticatedRequest} req - The request object containing authenticated user info and product ID.
   * @param {Response} res - The response object.
   * @returns {Promise<void>} A promise that resolves to void.
   */
  public async deleteProduct(req: AuthenticatedRequest, res: Response): Promise<void> {

    try {

      const { id } = req.params;
      const { error } = deleteProductSchema.validate({ id });

      if (error) {
        return handleValidationError(res, error, 'Validation error');
      }

      const product = await this.productService.getOneById(id);

      if (!product) {
        return ResponseUtil.toErrorResponse(res, 'Product not found', '', HttpStatusCode.NOT_FOUND);
      }

      product.deletedAt = new Date();
      product.deletedBy = req.user.sub;
      const productDeleted: CatalogProductEntity = await this.productService.delete(product);

      const productResumeDto: ProductResumeDto = ProductMapper.toProductResumeDto(productDeleted);

      return ResponseUtil.toSuccessResponse(res, { product: productResumeDto }, 'Product deleted successfully');
    } catch (error) {
      return handleError(res, error, 'Failed to delete product');
    }
  }
}
