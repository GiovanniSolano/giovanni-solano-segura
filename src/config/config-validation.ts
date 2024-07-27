import Joi from 'joi';

/**
 * Joi configuration - env variables to be able to initialize the project
*/

const configValidation = Joi.object({
    PORT: Joi.number().default(3307),
    DB_PORT: Joi.number().required(),
    DB_HOST: Joi.string().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().allow('').optional(),
    DB_NAME: Joi.string().required(),
    DB_TYPE: Joi.string().required(),
    JWT_SECRET_KEY: Joi.string().required(),
    JWT_EXPIRES_IN: Joi.string().required()
})
.unknown(true).required();


export default configValidation;