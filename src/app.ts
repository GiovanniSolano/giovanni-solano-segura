import express from 'express';
import config from '@config/index';
import cors from 'cors';
import helmet from 'helmet';
import { AppDataSource } from '@database/typeorm.config';
import {productRoutes} from '@features/product/routes';
import { authRoutes } from "@features/auth/routes";

const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Set security-related HTTP headers

/**
 * Starts the Express server and initializes the application.
 * 
 * This function performs the following tasks:
 * - Connects to the database
 * - Configures the application's routes
 * - Starts the server and listens for incoming requests
 */
const startServer = async () => {

    try {

        // Initialize Database 
        await AppDataSource.initialize();
        console.log('Database connected successfully');

        // Auth routes
        app.use(`${config.api.prefix}/auth`, authRoutes);

        // Product routes
        app.use(`${config.api.prefix}/products`, productRoutes);

        // Start server
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });

    } catch (error) {
        console.error('Error during database connection:', error);
    }
};

startServer();

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});