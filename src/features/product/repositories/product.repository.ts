import { EntityManager, FindOptionsWhere, In, Repository } from 'typeorm';
import { CatalogProductEntity } from '@features/product/entities/product.entity';

/**
 * ProductRepository
 * Manages data operations related to products in the database.
 */
export class ProductRepository {
  private repository: Repository<CatalogProductEntity>;

  /**
   * Initializes the repository with the given EntityManager.
   * 
   * @param entityManager - The EntityManager instance used to interact with the database.
   */
  constructor(entityManager: EntityManager) {
    this.repository = entityManager.getRepository(CatalogProductEntity);
  }

  /**
   * Retrieves all products from the database.
    * @param limit - Number of products.
    * @param offset - Number of skipped products.
   * @returns A promise that resolves to an array of CatalogProductEntity.
   */
  public async findAll(limit: number, offset: number): Promise<CatalogProductEntity[]> {
    return this.repository.find({
      take: limit,
      skip: offset
    });
  }

  /**
   * Retrieves the number of products.
   * @returns A promise that resolves to a number of products.
   */
  public async count(): Promise<number> {
    return this.repository.count();
  }

  /**
   * Saves a new product or updates an existing one in the database.
   * 
   * @param product - The product entity to be saved or updated.
   * @returns A promise that resolves to the saved CatalogProductEntity.
   */
  public async save(product: CatalogProductEntity): Promise<CatalogProductEntity> {
    return this.repository.save(product);
  }

  /**
   * Finds a product by its unique identifier.
   * 
   * @param id - The unique identifier of the product to find.
   * @returns A promise that resolves to the found CatalogProductEntity or null if not found.
   */
  public async findById(id: string): Promise<CatalogProductEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  /**
   * Save products or update existing ones in the database.
   * 
   * @param products - The product entity array to be saved or updated.
   * @returns A promise that resolves to the saved CatalogProductEntity.
   */
  public async saveBatch(products: CatalogProductEntity[]): Promise<CatalogProductEntity[]> {
    return this.repository.save(products);
  }

  /**
 * Fetch products by their IDs.
 * @param {string[]} ids - Array of product IDs.
 * @returns {Promise<CatalogProductEntity[]>} - Promise resolving to an array of products.
 */
  public async findByIds(ids: string[]): Promise<CatalogProductEntity[]> {
    const queryOptions: FindOptionsWhere<CatalogProductEntity> = {
      id: In(ids),
    };
    return this.repository.find({ where: queryOptions });

  }

}
