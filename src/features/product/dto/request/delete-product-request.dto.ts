import Joi from 'joi';

/**
 * Schema for validating the request to delete a product.
 */
export const deleteProductSchema = Joi.object({
  /**
   * The unique identifier of the product to be deleted. Must be a valid UUID format.
   * @type {string}
   */
  id: Joi.string().uuid().required()
});
