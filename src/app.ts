import express from "express"
import config from '@config/index';
import cors from "cors"
import helmet from "helmet"
import { AppDataSource } from "@database/typeorm.config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(helmet());

const startServer = async () => {
    try {

        await AppDataSource.initialize();
        console.log('Database connected successfully');

        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });

    } catch (error) {
        console.error('Error during database connection:', error);
    }
};

startServer();