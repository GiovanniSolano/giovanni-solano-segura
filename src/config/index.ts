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
    port: enVars.PORT,
    database: {
        type: enVars.DATABASE_TYPE,
        host: enVars.DATABASE_HOST,
        port: +enVars.DATABASE_PORT,
        username: enVars.DATABASE_USERNAME,
        password: enVars.DATABASE_PASSWORD,
        database: enVars.DATABASE_NAME,
    },
    api: {
        prefix: enVars.API_PREFIX
    },
    jwt: {
        secret_key: enVars.JWT_SECRET_KEY,
        expires_in: enVars.JWT_EXPIRES_IN
    }
}

export default config;