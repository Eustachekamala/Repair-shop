import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";


config({path : ".env.local"});

//logger
//const db = drizzle(sql, {logger : true})

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql)


export { db }