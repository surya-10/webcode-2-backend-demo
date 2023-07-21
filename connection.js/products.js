import { client } from "../db.js";

export async function getAllMob(){
    return client.db("products").collection("mobiles").find().toArray();
}
export async function getAllLaptop(){
    return client.db("products").collection("laptops").find().toArray();
}
export async function findAllMobileName(name){
    return client.db("products").collection("laptops").find({title:{$regex:/HP/}})
}