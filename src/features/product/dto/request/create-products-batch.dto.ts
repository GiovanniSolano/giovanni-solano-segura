import Joi from 'joi';

/**
 * Schema for validating the creation of products in batch.
 */
export const createProductsBatchSchema = Joi.array()
  .min(1)
  .items(
    Joi.object({
      /**
       * The name of the product.
       * @type {string}
       */
      name: Joi.string()
        .max(255) 
        .required(),

      /**
       * A description of the product.
       * @type {string}
       */
      description: Joi.string()
        .required(),

      /**
       * The height of the product.
       * @type {number}
       */
      height: Joi.number()
        .required(),

      /**
       * The length of the product.
       * @type {number}
       */
      length: Joi.number()
        .required(),

      /**
       * The width of the product.
       * @type {number}
       */
      width: Joi.number()
        .required()
    })
  )
  .required();
