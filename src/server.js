// const express=require('exporess');
import express, { response } from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";
import authRoutes from "./routes/authRoutes.js";
import job from "./config/cron.js";
import authMuddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
job.start()
const PORT = process.env.PORT ?? 5001;
app.use(ratelimiter);
app.use(express.json());

// transaction /api/transactions
app.use("/api/transactions",authMuddleware,transactionsRoute)
app.use("/api/auth",authRoutes)

app.get("/api/health",(req,res)=>{
    res.status(200).json({status:"ok"})
})

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`http://127.0.0.0:${PORT}/`);
    })
})
