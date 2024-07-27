import Joi from 'joi';

/**
 * Schema for validating the request to retrieve a product by its ID.
 */
export const getProductByIdSchema = Joi.object({
  /**
   * The unique identifier of the product to retrieve. Must be a valid UUID format.
   * @type {string}
   */
  id: Joi.string().uuid().required(),
});

/**
 * DTO for retrieving a product by its ID.
 */
export class GetProductByIdDto {
    /**
     * The unique identifier of the product to retrieve.
     * @type {string}
     */
    public id!: string;
}
