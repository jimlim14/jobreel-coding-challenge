import express, { Express } from "express";
import dotenv from "dotenv";
const router = require('./router');
const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors()).use(express.json()).use(router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});