const express = require("express");
const router = express.Router({ mergeParams: true });
let app = express();
const path = require("path");


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
router.post("/:id/delete", listingController.deleteListings);





module.exports = router;