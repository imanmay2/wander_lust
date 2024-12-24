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


//Showing the listings in the home page.
app.get("/listings",(req,res)=>{
    const data=User.find().then((res_)=>{
        res.render("listings/home.ejs",{data:res_});
    }) 
});


