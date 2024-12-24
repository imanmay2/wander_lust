const mongoose=require("mongoose");
let userSchema=require("../models/listings.cjs");
const User=mongoose.model("listing",userSchema);
const data=require(".data.cjs");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


main().then((req,res)=>{
    User.listings.deleteMany({}).then((res_)=>{
        console.log(res_);
    })
})