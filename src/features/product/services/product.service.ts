import { ProductRepository } from '@features/product/repositories';
import { CatalogProductEntity } from '@features/product/entities';

/**
 * ProductService
 * Handles business logic related to products and interacts with the ProductRepository.
 */
export class ProductService {

  /**
   * Initializes the ProductService with the given ProductRepository.
   * 
   * @param productRepository - The ProductRepository instance used to perform data operations.
   */
  constructor(private productRepository: ProductRepository) {}

  /**
   * Retrieves all products from the repository.
   * 
   * @returns A promise that resolves to an array of CatalogProductEntity.
   */
  public async getAll(page: number, limit: number): Promise<{ products: CatalogProductEntity[], totalCount: number }> {
    const offset = (page - 1) * limit;
    const products = await this.productRepository.findAll(limit, offset);
    const totalCount = await this.productRepository.count();
    return { products, totalCount };
  }
  /**
   * Creates a new product and saves it in the repository.
   * 
   * @param newProduct - The product entity to be created.
   * @returns A promise that resolves to the created CatalogProductEntity.
   */
  public async create(newProduct: CatalogProductEntity): Promise<CatalogProductEntity> {
    return this.productRepository.save(newProduct);
  }

  /**
   * Retrieves a product by its unique identifier.
   * 
   * @param id - The unique identifier of the product to retrieve.
   * @returns A promise that resolves to the found CatalogProductEntity or null if not found.
   */
  public async getOneById(id: string): Promise<CatalogProductEntity | null> {
    return this.productRepository.findById(id);
  }

  /**
   * Updates an existing product and saves the changes in the repository.
   * 
   * @param updatedProduct - The product entity with updated information.
   * @returns A promise that resolves to the updated CatalogProductEntity.
   */
  public async update(updatedProduct: CatalogProductEntity): Promise<CatalogProductEntity> {
    return this.productRepository.save(updatedProduct);
  }

  /**
   * Deletes a product from the repository.
   * 
   * @param deletedProduct - The product entity to be deleted.
   * @returns A promise that resolves to the deleted CatalogProductEntity.
   */
  public async delete(deletedProduct: CatalogProductEntity): Promise<CatalogProductEntity> {
    return this.productRepository.save(deletedProduct);
  }

  /**
   * Fetch products by their IDs.
   * @param {string[]} ids - Array of product IDs.
   * @returns {Promise<CatalogProductEntity[]>} - Promise resolving to an array of products.
   */
    public async findByIds(ids: string[]): Promise<CatalogProductEntity[]> {
      return this.productRepository.findByIds(ids);
    }
}
