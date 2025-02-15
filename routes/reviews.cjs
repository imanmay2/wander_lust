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
const reviewSchema = require("../models/review.cjs");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

//Creating the Review Model.
let review = mongoose.model("review", reviewSchema);
router.post("/", async (req, res) => {
    let { id } = req.params;
    let { log } = req.cookies;
    let {currentUser}=req.cookies;
    if (log == "in") {
        
        // console.log(id);
        let listings = await User.findById(id);

        let { rating_, comment_ } = req.body;

        let review_ = new review({
            comment: comment_,
            rating: rating_,
            username:currentUser
        });
        listings.reviews.push(review_);
        if (await review_.save()) {
            // console.log("Data saved");
        }
        if (await listings.save()) {
            // console.log("All done!");
        }
        req.flash("success", "Review Added Successfully.");
        res.redirect(`/listings/${listings._id}`);
    } else if(log=="off"){
        res.cookie("log","review");
        res.cookie("id",id);
        req.flash("error","Please login before you add Review!");
        return res.redirect("/login");
    }
});

//Delete the reviews.
router.post("/:review_id", async (req, res) => {
    let { id, review_id } = req.params;
    let { log } = req.cookies;
    let res1 = await User.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
    let res2 = await review.findByIdAndDelete(review_id);
    req.flash("success", "Review Deleted Successfully.");
    res.redirect(`/listings/${id}`);
});
module.exports = router;