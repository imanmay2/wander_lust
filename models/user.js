const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },username:String,
    password:String
});



module.exports=new mongoose.model("User",userSchema);