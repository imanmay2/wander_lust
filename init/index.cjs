const mongoose=require("mongoose");
let userSchema=require("../models/listings.cjs");
const User=mongoose.model("listing",userSchema);
const initialize_data=require("./data.cjs");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


main().then(async(req,res)=>{
    await User.deleteMany({}).then((res_)=>{
        console.log(res_);
        console.log("Data is deleted.");
    });

    initialize_data.data=initialize_data.data.map((obj)=>({
        ...obj,
        owner:" "
    }));
    await User.insertMany(initialize_data.data).then((res_)=>{
        console.log("Data was added.");
    })
})
