// const express=require('exporess');
import express, { response } from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5001;
app.use(ratelimiter);
app.use(express.json());

// transaction /api/transactions
app.use("/api/transactions",transactionsRoute)




initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`http://127.0.0.0:${PORT}/`);
    })
})
