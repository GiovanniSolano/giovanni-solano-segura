import Joi from 'joi';

/**
 * Joi schema for validating a batch delete request payload.
 */
export const deleteProductsBatchSchema = Joi.array()
  .required() 
  .items(
    Joi.string()
      .uuid()
      .required()
  );
