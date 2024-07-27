import { StateChangeEntity } from '@shared/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export const CATALOG_PRODUCTS_ENTITY_NAME = 'catalog_products';

/**
 * Represents a product in the catalog.
 */
@Entity({ name: CATALOG_PRODUCTS_ENTITY_NAME })
export class CatalogProductEntity extends StateChangeEntity {

  /**
   * Unique identifier for the product.
   * @type {string}
   */
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  public id!: string;

  /**
   * Name of the product.
   * @type {string}
   */
  @Column({
    name: 'name',
    length: 255
  })
  public name!: string;

  /**
   * Description of the product.
   * @type {string}
   */
  @Column({
    type: 'text',
    name: 'description'
  })
  public description!: string;

  /**
   * Height of the product.
   * @type {number}
   */
  @Column({
    type: 'float',
    name: 'height'
  })
  public height!: number;

  /**
   * Length of the product.
   * @type {number}
   */
  @Column({
    type: 'float',
    name: 'length'
  })
  public length!: number;

  /**
   * Width of the product.
   * @type {number}
   */
  @Column({
    type: 'float',
    name: 'width'
  })
  public width!: number;

  /**
   * Constructor to create a new instance of CatalogProductEntity.
   * @param entity - Partial entity to initialize the instance with.
   */
  constructor(entity: Partial<CatalogProductEntity>) {
    super();
    Object.assign(this, entity);
  }

  /**
   * Fills the entity with the provided data.
   * @param entity - Partial entity to update the instance with.
   */
  public fill(entity: Partial<CatalogProductEntity>) {
    Object.assign(this, entity);
  }

}
