const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
let userSchema = require("../models/listings.cjs");
let app = express();
const path = require("path");
const User = mongoose.model("listing", userSchema);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")))
const ExpressError = require("../utils/ExpressError.cjs");
const schema = require("../schema.cjs");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const listingController=require("../Controllers/listings.cjs");

//Showing the listings in the home page.
router.get("/",listingController.indexRoute );


// Adding the information.
router.get("/add", listingController.addInfoRoute);

//Delete Route.
router.get("/delete", listingController.deleteRoute);




// Showing the information of a particular Listing.
router.get("/:id", listingController.showListingRoute);



// ADD Route.
router.post("/addListings/add", listingController.addRoute);



// Edit information.
router.get("/:id/edit", listingController.editInfoRoute);




//Updation in the databse.
router.post("/:id/update", listingController.updateInfoRoute);




// Deleting the listings.
const reviewSchema = require("../models/review.cjs");
let review = mongoose.model("review", reviewSchema);
router.post("/:id/delete", async (req, res) => {
    let { id } = req.params;
    let listings_=await User.findById(id);
    let {currentUser}=req.cookies;
    res.cookie("id", id);
    let { log } = req.cookies;
    if (log == "off") {
        res.cookie("log", "delete");
        req.flash("error", "Please login before you delete.");
        return res.redirect("/login");
    }
    else if (log == "in") {
        if(currentUser!=listings_.owner){
            req.flash("error","You don't have permission to Delete the listing.");
            return res.redirect(`/listings/${id}`);
        }
        return res.redirect("/listings/delete");
    }
});


module.exports = router;