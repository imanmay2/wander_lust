const mongoose = require("mongoose");
let userSchema = require("../models/listings.cjs");
const User = mongoose.model("listing", userSchema);


const reviewSchema = require("../models/review.cjs");
let review = mongoose.model("review", reviewSchema);

module.exports.index=async (req, res) => {
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
}



module.exports.deleteReviews=async (req, res) => {
    let { id, review_id } = req.params;
    let { log } = req.cookies;
    if(log=="in"){
        let res1 = await User.findByIdAndUpdate(id, { $pull: { reviews: review_id } });
        let res2 = await review.findByIdAndDelete(review_id);
        req.flash("success", "Review Deleted Successfully.");
        res.redirect(`/listings/${id}`);
    } else if(log=="off"){
        req.flash("error","Please Login to continue!!");
        res.cookie("log","deleteReview");
        res.cookie("id",id);
        return res.redirect("/login");
    }
}