let express=require("express");
const mongoose=require("mongoose");

let reviewSchema=new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    username:{
        type:String,
        required:true
    }
});


module.exports=reviewSchema;  
