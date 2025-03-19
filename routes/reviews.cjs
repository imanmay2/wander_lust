let express = require("express");
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

const cookieParser = require("cookie-parser");
router.use(cookieParser());


const reviewController=require("../Controllers/reviews.cjs");


router.post("/", reviewController.index);

//Delete the reviews.
router.post("/:review_id", reviewController.deleteReviews);
module.exports = router;