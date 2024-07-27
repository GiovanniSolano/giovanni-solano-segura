import { AppDataSource } from '@database/typeorm.config';
import { ProductRepository } from '@features/product/repositories';
import { ProductService } from '@features/product/services/product.service';

/**
 * ProductModule
 * Manages the creation and retrieval of ProductService and ProductRepository instances.
 */
export class ProductModule {

  private static productRepository: ProductRepository;

  /**
   * Retrieves an instance of ProductService.
   * Initializes the ProductRepository if it has not been created yet.
   * 
   * @returns An instance of ProductService.
   */
  public static getProductService(): ProductService {
    return new ProductService(
      this.getProductRepository()
    );
  }

  /**
   * Retrieves an instance of ProductRepository.
   * Creates a new instance using the AppDataSource manager if it does not already exist.
   * 
   * @returns An instance of ProductRepository.
   */
  public static getProductRepository(): ProductRepository {
    if (!this.productRepository) {
      this.productRepository = new ProductRepository(AppDataSource.manager);
    }
    return this.productRepository;
  }
}
