import dotenv from 'dotenv';
import configValidation from '@config/config-validation';

/**
 * Env variables configuration
*/

dotenv.config();

const { error, value: enVars } = configValidation.validate(process.env, { abortEarly: false });

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    port: enVars.PORT
}

export default config;