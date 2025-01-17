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


//Showing the listings in the home page.
router.get("/",async(req,res)=>{
    const data=await User.find().then((res_)=>{
        // res.locals.message=req.flash("success");
        res.render("listings/home.ejs",{data:res_});
    }) 
});


// Adding the information.
router.get("/add",(req,res)=>{
    res.render("listings/add.ejs");
});



// Showing the information of a particular Listing.
router.get("/:id",async(req,res)=>{
    let {id}=req.params;
    await User.findById(id).populate("reviews").then((res_)=>{
        // console.log(res_);
        res.render("listings/info.ejs",{data:res_})
    })
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
    // req.flash("success","Listing Added Successully!");
    res.redirect("/listings");
});



// Edit information.
router.get("/:id/edit",async(req,res)=>{
    let {id}=req.params;
    await User.findById(id).then((res_)=>{
        res.render("listings/edit.ejs",{data:res_});
    })
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
        res.redirect(`/listings`);
    });
});


// Deleting the listings.
const reviewSchema=require("../models/review.cjs");
let review=mongoose.model("review",reviewSchema);
router.post("/:id/delete",async(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let obj_=await User.findById(id);
    let arr=obj_.reviews;
    for(let i of arr){
        await review.findByIdAndDelete(i);
    }
    await User.findByIdAndDelete(id).then((res_)=>{
        console.log("Data Deleted from listings.");
        res.redirect("/listings");
    })
});


module.exports=router;