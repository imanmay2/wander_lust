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
const User=require("../models/user.js");
const cookieParser=require("cookie-parser");
router.use(cookieParser());

router.get("/signup",(req,res)=>{
    res.render("user/signup.ejs");
});


router.post("/signup",async (req,res)=>{
    let {email_,username_,password_}=req.body;
    let hash=(await bcrypt.hash(password_,8)).toString();
    let checkUser=await User.find({username:username_});
    console.log(checkUser);
    if(!checkUser.length){
        let newUser=new User({
            email:email_,
            username:username_,
            password:hash
        });
        await newUser.save();
        req.flash("success","You are successfully Signed up. Welcome to Wanderlust");
        res.cookie("log","in");
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
router.post("/login",async (req,res)=>{
    let {username_,password_}=req.body;
    let checkUser=await User.find({username:username_});
    if(checkUser.length){
        let hash=checkUser[0].password;
        if(await bcrypt.compare(password_,hash)){
            let {log} = req.cookies;
            res.cookie("log","in");
            req.flash("success","You are logged in! Welcome back to Wanderlust!");
            if(log=="add"){
                return res.redirect("/listings/add");
            } else if(log=="edit"){
                let {id}=req.cookies;
                return res.redirect(`/listings/${id}/edit`);
            }
            else{
                return res.redirect("/listings");
            }
        } else{
            res.cookie("log","off");
            req.flash("error","Invalid Password/Credentials entered!");
            return res.redirect("/login");
        }
    }
    else{
        req.flash("error","Invalid Username entered, Please check the Username and try again!");
        return res.redirect("/login");
    }
})

router.get("/logout",(req,res)=>{
    const {log} = req.cookies;
    if(log == "in"){
        res.cookie("log","off");
    }
    res.redirect("/listings");
})

router.get("/signup",(req,res)=>{
    res.render("/user/signup.ejs");
})

module.exports=router;