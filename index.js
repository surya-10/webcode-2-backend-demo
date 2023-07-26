import cheerio from "cheerio";
import axios from "axios";
import express from "express";
import { client, connectToDb } from "./db.js";
import fs from "fs";
import { studentRouter } from "./drivers/router.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const url = "https://www.flipkart.com/search?q=laptop&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off&as-pos=1&as-type=HISTORY&page=26";


(async () => {
let response = await axios.get(url);
const html = response.data;
let $ = cheerio.load(html);
const title = $('title').text();
let productTitles = [];
$('._1AtVbE').each((index, element) => {
  let obj = {title:"", image:"", rating:"", price:"", finalPrice:""}
     obj.title = $(element).find("._4rR01T").text();
    obj.image = $(element).find("._396cs4").attr("src");
    obj.rating = $(element).find("._3LWZlK").text();
    obj.price = $(element).find("._3I9_wc").text();
    obj.finalPrice = $(element).find("._30jeq3").text();
    if(obj.title!="" && obj.image!=""){
      productTitles.push(obj);

      // client.db("products").collection("laptops").insertOne({title:obj.title, image:obj.image, rating:obj.rating, price:obj.price, finalPrice:obj.finalPrice });
    }
    
  });

})();
// connectToDb()
let app = express();
let port = process.env.port;
app.listen(port, ()=>{
  console.log("Server connected");
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
  res.send("working good");
});

app.use("/", studentRouter);
