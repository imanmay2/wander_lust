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
app.get("/listings",async(req,res)=>{
    const data=await User.find().then((res_)=>{
        res.render("listings/home.ejs",{data:res_});
    }) 
});


// Showing the information of a particular Listing.
app.get("/listings/:id",(req,res)=>{
    let {id}=req.params;
    User.findById(id).then((res_)=>{
        res.render("listings/info.ejs",{data:res_})
    })
});


// Editing the information.
app.get("/listings/:id/edit",(req,res)=>{
    let {id}=req.params;
    User.findById(id).then((res_)=>{
        res.render("listings/edit.ejs",{data:res_});
    })
});


//UPDATE route---POST request .

app.post("/listings/:id/update",(req,res)=>{
    let {id}=req.params;
    let {title_,descrip_,url_,price_,location_,country_}=req.body;
    let data_=new User({title:title_,description:descrip_,image:{filename:"listingimage",url:url_},price:price_,location:location_,country:country_});
    data_.save();
    res.redirect("/listings/:id");
});