import {neon} from "@neondatabase/serverless";
import "dotenv/config";

// create sql connection 
const url=process.env.DATABASE_URL
export const sql = neon(url);

export async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL (10,2) NOT NULL,
        category VARCHAR(255),
        created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`
        console.log("DB initilized");

    } catch (error) {
        console.log("server.js DB error", error)
        process.exit(1);
    }
}