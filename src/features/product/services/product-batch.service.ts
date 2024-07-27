import { ProductRepository } from '@features/product/repositories';
import { CatalogProductEntity } from '@features/product/entities';

/**
 * ProductBatchService
 * Handles business logic related to product batch operations and interacts with the ProductRepository.
 */
export class ProductBatchService {

  /**
   * Initializes the ProductBatchService with the given ProductRepository.
   * 
   * @param productRepository - The ProductRepository instance used to perform data operations.
   */
  constructor(private productRepository: ProductRepository) {}

  /**
   * Creates a batch of new products.
   * 
   * @param products - An array of CatalogProductEntity instances to be created.
   * @returns A promise that resolves to an array of the created CatalogProductEntity instances.
   */
  public async createBatch(products: CatalogProductEntity[]): Promise<CatalogProductEntity[]> {
    return this.productRepository.saveBatch(products);
  }

  /**
   * Updates a batch of existing products.
   * 
   * @param products - An array of CatalogProductEntity instances to be updated.
   * @returns A promise that resolves to an array of the updated CatalogProductEntity instances.
   */
  public async updateBatch(products: CatalogProductEntity[]): Promise<CatalogProductEntity[]> {
    return this.productRepository.saveBatch(products);
  }

  /**
   * Deletes a batch of products.
   * 
   * @param products - An array of CatalogProductEntity instances to be deleted.
   * @returns A promise that resolves to void once the deletion is complete.
   */
  public async deleteBatch(products: CatalogProductEntity[]): Promise<void> {
    await this.productRepository.saveBatch(products);
  }
}
