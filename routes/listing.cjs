const express=require("express");
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose");
let userSchema=require("../models/listings.cjs");
let app=express();
const path=require("path");
const User=mongoose.model("listing",userSchema);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")))
const ExpressError=require("../utils/ExpressError.cjs");
const schema=require("../schema.cjs");
const cookieParser=require("cookie-parser");
router.use(cookieParser());
//Showing the listings in the home page.
router.get("/",async(req,res)=>{
    const {log} = req.cookies;
    if(log==undefined){
        res.cookie("log","off");
    } else if(log=="add"){
        res.cookie("log","off");
    }
    const data=await User.find().then((res_)=>{
        res.render("listings/home.ejs",{data:res_});
    }) 
});



// Adding the information.
router.get("/add",(req,res)=>{
    let {log}=req.cookies;
    if(log=="add" || log=="edit" || log=="delete"){
        log = "off";
    }
    if(log=="off"){
        req.flash("error","You must have logged in to create listings");
        res.cookie("log","add");
        return res.redirect("/login");
    } else if(log=="in"){
        res.render("listings/add.ejs");
    }
});

router.get("/delete",async(req,res)=>{
    let {id} = req.cookies;
    
    let obj_=await User.findById(id);
    console.log(obj_);
    if(!obj_){
        req.flash("error","Listing you are looking for doesn't exists!");
        return res.redirect("/listings");
    }
    let arr=obj_.reviews;
    for(let i of arr){
        await review.findByIdAndDelete(i);
    }
    let listings=await User.findByIdAndDelete(id);
    if(listings){
        req.flash("success","Listing Deleted Successully!");
        return res.redirect("/listings");
    }
});




// Showing the information of a particular Listing.
router.get("/:id",async(req,res)=>{
    let {id}=req.params;
    let listings_=await User.findById(id).populate("reviews");
    if(!listings_){
        req.flash("error","Listing you are looking for doesn't exists!");
        res.redirect("/listings");
    } else {
    res.render("listings/info.ejs",{data:listings_});
    }
});



// ADD Route.
router.post("/addListings/add",async(req,res,next)=>{
    let {title_,descrip_,url_,price_,location_,country_}=req.body;
    if((!req.body)){
        throw new ExpressError(400,"Content is Empty");
    }
    let data_=new User({
    title:title_,
    description:descrip_,
    image:{
        filename:"imagefile",
        url:url_
        },
        price:price_,
        location:location_,
        country:country_
    });
    await data_.save();
    req.flash("success","Listing Added Successully!");
    res.redirect("/listings");
});



// Edit information.
router.get("/:id/edit",async(req,res)=>{
    let {id}=req.params;
    res.cookie("id",id);
    let {log}=req.cookies;
    if(log=="off"){
        res.cookie("log","edit");
        req.flash("error","Please login before editing the listing.");
        return res.redirect("/login");
    } else if(log=="in"){
        
        let listings_=await User.findById(id);
        console.log(listings_);
        if(!listings_){
            req.flash("error","Listing you are looking for doesn't exists!");
            res.redirect("/listings");
        } else{
            res.render("listings/edit.ejs",{data:listings_});
        }
    }
});




//Updation in the databse.
router.post("/:id/update",async(req,res,next)=>{
        let {id}=req.params;
        let {title_,descrip_,url_,price_,location_,country_}=req.body;
        let result=schema.validate(req.body);
        // console.log(result);
        if(result.error){
            throw new ExpressError(500,result.error);
        }
        await User.findByIdAndUpdate(id,{
        title:title_,
        description:descrip_,
        image:{
            filename:"imagefile",
            url:url_,
        },
        price:price_,
        location:location_,
        country:country_
    }).then((res_)=>{
        // console.log(res);
        // console.log("UPDATION SUCCESSFUL.");
        req.flash("success","Listing Updated Successully!");
        res.redirect(`/listings`);
    });
});




// Deleting the listings.
const reviewSchema=require("../models/review.cjs");
let review=mongoose.model("review",reviewSchema);
router.post("/:id/delete",async(req,res)=>{
    let {id}=req.params;
    res.cookie("id",id);
    let {log}=req.cookies;
    if(log=="off"){
        res.cookie("log","delete");
        req.flash("error","Please login before you delete.");
        return res.redirect("/login");
    }
    else if(log=="in"){
        return res.redirect("/listings/delete");
    }
});


module.exports=router;