import Joi from 'joi';

/**
 * Schema for validating the update of products in batch.
 */
export const updateProductsBatchSchema = Joi.array()
  .min(1)
  .items(
    Joi.object({
      /**
       * The unique identifier of the product to update.
       * @type {string}
       */
      id: Joi.string()
        .uuid()
        .required(),

      /**
       * The name of the product.
       * @type {string}
       */
      name: Joi.string()
        .max(255)
        .optional(),

      /**
       * A description of the product.
       * @type {string}
       */
      description: Joi.string()
        .optional(),

      /**
       * The height of the product.
       * @type {number}
       */
      height: Joi.number()
        .optional(),

      /**
       * The length of the product.
       * @type {number}
       */
      length: Joi.number()
        .optional(),

      /**
       * The width of the product.
       * @type {number}
       */
      width: Joi.number()
        .optional()
    })
  )
  .required();
