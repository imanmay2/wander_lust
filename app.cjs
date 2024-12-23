let express=require("express");
const mongoose=require("mongoose");
let userSchema=require("./models/listings.cjs");
let app=express();
const port=8080;
const User=mongoose.model("listing",userSchema);


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}


main().then(()=>{
    console.log("Connection Successful ! ");
}) .catch((err)=>{
    console.log(err);
})


app.listen(port,(req,res)=>{
    console.log("Server is listening to : ",port);
});


app.get("/",(req,res)=>{
    const user1=new User({
        title:"Villa",
        description:"flat",
        price:12000000,
        location:"Bangalore",
        country:"India"
    })
    user1.save();
})