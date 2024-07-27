import { CatalogProductEntity } from '@features/product/entities/product.entity';
import { ProductResumeDto } from '@features/product/dto/response';

/**
 * Provides mapping functions for converting between product entities and data transfer objects (DTOs).
 */
export class ProductMapper {
  
  /**
   * Converts a CatalogProductEntity to a ProductResumeDto.
   * 
   * @param product - The product entity to convert.
   * @returns A ProductResumeDto representing the product entity.
   */
  static toProductResumeDto(product: CatalogProductEntity): ProductResumeDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      height: product.height,
      length: product.length,
      width: product.width
    };
  }

  /**
   * Converts an array of CatalogProductEntity to an array of ProductResumeDto.
   * 
   * @param products - The array of product entities to convert.
   * @returns An array of ProductResumeDto representing the product entities.
   */
  public static toProductResumeDtoList(products: CatalogProductEntity[]): ProductResumeDto[] {
    return products.map(product => this.toProductResumeDto(product));
  }
}
