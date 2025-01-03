let express=require("express");
const mongoose=require("mongoose");
let userSchema=require("./models/listings.cjs");
let app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const port=8080;
const User=mongoose.model("listing",userSchema);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")))


app.engine("ejs",ejsMate);


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
    res.send("This is the root site.");
})

//Showing the listings in the home page.
app.get("/listings",async(req,res)=>{
    const data=await User.find().then((res_)=>{
        res.render("listings/home.ejs",{data:res_});
    }) 
});

// Adding the information.
app.get("/listings/add",(req,res)=>{
    res.render("listings/add.ejs");
});



// Showing the information of a particular Listing.
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await User.findById(id).then((res_)=>{
        res.render("listings/info.ejs",{data:res_})
    })
});



// ADD Route.
app.post("/listings/addListings/add",async(req,res)=>{
    // let {id}=req.params;
    console.log(req.body);
    let {title_,descrip_,url_,price_,location_,country_}=req.body;
    let data_=new User({
        title:title_,
        description:descrip_,
        image:{
            filename:"imagefile",
            url:url_
        },
        price:price_,
        location:location_,
        country:country_
    });
    await data_.save();
    console.log("Updated.");
    res.redirect("/listings");
});



// Edit information.
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    await User.findById(id).then((res_)=>{
        res.render("listings/edit.ejs",{data:res_});
    })
});



//Updation in the databse.
app.post("/listings/:id/update",async(req,res)=>{
    let {id}=req.params;
    let {title_,descrip_,url_,price_,location_,country_}=req.body;
    console.log(req.body);
    await User.findByIdAndUpdate(id,{
        title:title_,
        description:descrip_,
        image:{
            filename:"imagefile",
            url:url_,
        },
        price:price_,
        location:location_,
        country:country_

    }).then((res_)=>{
        // console.log(res);
        console.log("UPDATION SUCCESSFUL.");
        res.redirect(`/listings`);
    });
})


// Deleting the listings.
app.post("/listings/:id/delete",(req,res)=>{
    let {id}=req.params;
    User.findByIdAndDelete(id).then((res_)=>{
        console.log("Data Deleted.");
        res.redirect("/listings");
    })
});

