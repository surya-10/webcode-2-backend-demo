import express from "express";
import { findAllMobileName, getAllLaptop, getAllMob } from "../connection.js/products.js";


let router = express.Router();

router.get("/mobiles/all", async(req, res)=>{
    let prod = await getAllMob();
    if(prod.length===0){
        res.status(400).send({msg:"Unable to find your data"});
    }
    res.status(200).send({data:prod});
})

router.get("/laptops/all", async(req, res)=>{
    let lap = await getAllLaptop();
    if(lap.length===0){
        res.status(400).send({msg:"Unable to find your data"});
    }
    res.status(200).send({data:lap});
})

router.get("/all", async(req, res)=>{
    let lap = await getAllLaptop();
    let mob = await getAllMob();
    let allProd = [...lap, ...mob];
    if(allProd.length===0){
        res.status(400).send({response:"No data available at this time"});
    }
    res.status(200).send({data:allProd});
})

router.get("/laptop/:name", async(req, res)=>{
    let {name} = req.params;
    console.log(name)
    let selectedMobiles = await findAllMobileName(name); 
    console.log(selectedMobiles)
    if(selectedMobiles.length===0){
        res.status(400).send({response:"No data available at this time"});
    }
    res.status(200).send({selectedData:selectedMobiles});
})
export const studentRouter = router;

