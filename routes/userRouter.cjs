const express=require("express");
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose");
let userSchema=require("../models/listings.cjs");
let app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")))
const ExpressError=require("../utils/ExpressError.cjs");
const schema=require("../schema.cjs");


router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});



module.exports=router;