const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/a-body-of-water-with-clouds-above-it-RK4lzmfrGak"
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    }
})


module.exports=userSchema;