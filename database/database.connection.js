import pg from  "pg"
import dotenv from "dotenv"
dotenv.config()

const databaseOpitions = {
        connectionString: process.env.DATABASE_URL,
        ssl:true
    }

export const db = new pg.Pool(databaseOpitions)