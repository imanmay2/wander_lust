const express=require("express");
const router=express.Router({mergeParams:true});
const mongoose=require("mongoose");

let app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
const ExpressError=require("../utils/ExpressError.cjs");


const passport=require("passport");
const User=require("../models/user.js");

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});


router.post("/signup",async (req,res)=>{
    try{
    let {email_,username_,password}=req.body;
    let newUser=new User({
        email:email_,
        username:username_
    });
    let registeredUser=await User.register(newUser,password);
    req.flash("success","You are successfully Signed up. Welcome to Wanderlust");
    res.redirect("/listings");
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
});


router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
})


router.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true
}),async(req,res)=>{
    req.flash("success","You have successfully logged in! Welcome back to Wanderlust.");
    res.redirect("/listings");
}
)


module.exports=router;