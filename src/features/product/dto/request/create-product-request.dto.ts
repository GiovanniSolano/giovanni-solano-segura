import Joi from 'joi';

/**
 * Schema for validating the creation of a new product.
 */
export const createProductSchema = Joi.object({
  /**
   * The name of the product.
   * @type {string}
   */
  name: Joi.string().max(255).required(),

  /**
   * A description of the product. Must be a string.
   * @type {string}
   */
  description: Joi.string().required(),

  /**
   * The height of the product. Must be a number.
   * @type {number}
   */
  height: Joi.number().required(),

  /**
   * The length of the product. Must be a number.
   * @type {number}
   */
  length: Joi.number().required(),

  /**
   * The width of the product. Must be a number.
   * @type {number}
   */
  width: Joi.number().required(),
}).options({ abortEarly: false });

/**
 * DTO for creating a new product.
 */
export class CreateProductDto {
  /**
   * The name of the product.
   * @type {string}
   */
  public name!: string;

  /**
   * A description of the product.
   * @type {string}
   */
  public description!: string;

  /**
   * The height of the product.
   * @type {number}
   */
  public height!: number;

  /**
   * The length of the product.
   * @type {number}
   */
  public length!: number;

  /**
   * The width of the product.
   * @type {number}
   */
  public width!: number;

  /**
   * The ID of the user creating the product. Optional field.
   * @type {string}
   */
  public createdBy?: string;
}
