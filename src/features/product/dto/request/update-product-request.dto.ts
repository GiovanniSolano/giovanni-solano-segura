import Joi from 'joi';

/**
 * Schema for validating the request to update a product.
 */
export const updateProductSchema = Joi.object({
  /**
   * The unique identifier of the product to be updated.
   * @type {string}
   */
  id: Joi.string().uuid().required(),

  /**
   * The name of the product. Optional field
   * @type {string}
   */
  name: Joi.string().max(255).optional(),

  /**
   * The description of the product. Optional field
   * @type {string}
   */
  description: Joi.string().optional(),

  /**
   * The height of the product. Optional field
   * @type {number}
   */
  height: Joi.number().optional(),

  /**
   * The length of the product. Optional field
   * @type {number}
   */
  length: Joi.number().optional(),

  /**
   * The width of the product. Optional field
   * @type {number}
   */
  width: Joi.number().optional(),
});

/**
 * DTO for updating a product.
 */
export class UpdateProductDto {

    /**
     * The id of the product. Optional field.
     * @type {string}
     */
      public id?: string;

    /**
     * The name of the product. Optional field.
     * @type {string}
     */
    public name?: string;

    /**
     * The description of the product. Optional field.
     * @type {string}
     */
    public description?: string;

    /**
     * The height of the product. Optional field.
     * @type {number}
     */
    public height?: number;

    /**
     * The length of the product. Optional field.
     * @type {number}
     */
    public length?: number;

    /**
     * The width of the product. Optional field.
     * @type {number}
     */
    public width?: number;
}
