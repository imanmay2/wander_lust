const bcrypt=require("bcrypt");
const User=require("../models/user.cjs");


module.exports.signupPostRoute=async (req,res)=>{
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
        res.cookie("currentUser",username_);
        req.flash("success","You are successfully Signed up. Welcome to Wanderlust");
        let {log}=req.cookies;
        res.cookie("log","in");
        if(log=="add"){
            return res.redirect("/listings/add");
        }
        res.redirect("/listings");
    }
     else{
        req.flash("error","User already exists by this Username");
        res.redirect("/signup");
    }
}

module.exports.signupGetRoute=(req,res)=>{
    res.render("user/signup.ejs");
}


module.exports.loginRoute=(req,res)=>{
    res.render("user/login.ejs");
}




module.exports.loginPostRoute=async (req,res)=>{
    let {username_,password_}=req.body;
    let checkUser=await User.find({username:username_});
    if(checkUser.length){
        let hash=checkUser[0].password;
        if(await bcrypt.compare(password_,hash)){
            let {log} = req.cookies;
            res.cookie("log","in");
            req.flash("success","You are logged in! Welcome back to Wanderlust!");
            res.cookie("currentUser",username_);
            if(log=="add"){
                return res.redirect("/listings/add");
            } else if(log=="edit"){
                let {id}=req.cookies;
                return res.redirect(`/listings/${id}/edit`);
            } else if(log=="delete"){
                return res.redirect(`/listings/delete`);
            }else if(log=="review" || log=="deleteReview"){
                let {id}=req.cookies;
                return res.redirect(`/listings/${id}`);
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
}


module.exports.logoutRoute=(req,res)=>{
    const {log} = req.cookies;
    if(log == "in"){
        res.cookie("log","off");
        res.cookie("currentUser","");
        res.cookie("id","");
    }
    res.redirect("/listings");
}


module.exports.sign