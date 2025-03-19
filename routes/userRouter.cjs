const express=require("express");
const router=express.Router();
let app=express();
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));
const cookieParser=require("cookie-parser");
const userRouterControl = require("../Controllers/userRouter.cjs");
router.use(cookieParser());

router.route("/signup").get(userRouterControl.signupGetRoute).post(userRouterControl.signupPostRoute)

router.route("/login").get(userRouterControl.loginRoute).post(userRouterControl.loginPostRoute);



router.get("/logout",userRouterControl.logoutRoute)

module.exports=router;