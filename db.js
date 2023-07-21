import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let mongoStr = process.env.mongoConnect;
export async function connectToDb(){
    let client = new MongoClient(mongoStr);
    client.connect();
    console.log("connect to DB")
    return client;
}
export const client = await connectToDb();
