const express=require("express");
const router=express.Router();
let app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
const bcrypt=require("bcrypt");


const passport=require("passport");
const User=require("../models/user.js");

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});


router.post("/signup",async (req,res)=>{
    let {email_,username_,password_}=req.body;
    //hashing algorithm
    // let salt=bcrypt.genSaltSync(10);
    let hash=bcrypt.hashSync(password_,8);
    
    let checkUser=await User.find({username:username_});
    console.log(checkUser);
    if(!checkUser.length){
        let newUser=new User({
            email:email_,
            username:username_,
            password:hash
        });
        let registeredUser=await newUser.save();
        console.log(registeredUser);
        req.flash("success","You are successfully Signed up. Welcome to Wanderlust");
        res.redirect("/listings");
    }
    
     else{
        req.flash("error","User already exists by this Username");
        res.redirect("/signup");
    }
});


router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
})



//LOGIC TO BE IMPLEMENTED
router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust, You are logged in");
    res.redirect("/listings");
})


module.exports=router;