import "reflect-metadata";
import express from 'express';
import { initializerRouter } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

initializerRouter(app);

app.use(errorHandler);

export default app;