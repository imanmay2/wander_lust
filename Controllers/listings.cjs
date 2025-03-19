const mongoose = require("mongoose");
let userSchema = require("../models/listings.cjs");
const User = mongoose.model("listing", userSchema);

module.exports.indexRoute=async (req, res) => {
    const { log } = req.cookies;
    if (log == undefined) {
        res.cookie("log", "off");
    } else if (log == "add" || log == "review" || log == "deleteReview") {
        res.cookie("log", "off");
    }
    const data = await User.find().then((res_) => {
        res.render("listings/home.ejs", { data: res_ });
    })
}


module.exports.addInfoRoute=async(req, res) => {
    let { log } = req.cookies;
    if (log == "add" || log == "edit" || log == "delete") {
        log = "off";
    }
    if (log == "off") {
        req.flash("error", "You must have logged in to create listings");
        res.cookie("log", "add");
        return res.redirect("/login");
    } else if (log == "in") {
        res.render("listings/add.ejs");
    }
}



module.exports.deleteRoute=async (req, res) => {
    let { id } = req.cookies;
    let obj_ = await User.findById(id);
    let {currentUser}=req.cookies;
    console.log(obj_);
    if(currentUser!=obj_.owner){
        req.flash("error", "You don't have permission to Delete the post");
        return res.redirect(`/listings/${id}`);
    }
    if (!obj_) {
        req.flash("error", "Listing you are looking for doesn't exists!");
        return res.redirect("/listings");
    }
    let arr = obj_.reviews;
    for (let i of arr) {
        await review.findByIdAndDelete(i);
    }
    let listings = await User.findByIdAndDelete(id);
    if (listings) {
        req.flash("success", "Listing Deleted Successully!");
        return res.redirect("/listings");
    }
}


module.exports.showListingRoute=async (req, res) => {
    let { log } = req.cookies;
    let { id } = req.params;
    let listings_ = await User.findById(id).populate("reviews");
    if (!listings_) {
        req.flash("error", "Listing you are looking for doesn't exists!");
        res.redirect("/listings");
    } else {
        console.log(listings_);
        let { currentUser } = req.cookies;
        res.render("listings/info.ejs", { data: listings_, currentUser: currentUser, postOwner: listings_.owner });
    }
}


module.exports.addRoute=async (req, res, next) => {
    let { title_, descrip_, url_, price_, location_, country_ } = req.body;
    const { currentUser } = req.cookies;
    if ((!req.body)) {
        throw new ExpressError(400, "Content is Empty");
    }
    let data_ = new User({
        title: title_,
        description: descrip_,
        image: {
            filename: "imagefile",
            url: url_
        },
        price: price_,
        location: location_,
        country: country_
    });
    if (currentUser != null || currentUser != undefined || currentUser != "") {
        data_.owner = currentUser;
    }
    await data_.save();

    req.flash("success", "Listing Added Successully!");
    res.redirect("/listings");
}


module.exports.editInfoRoute=async (req, res) => {

    let { id } = req.params;
    res.cookie("id", id);
    let { log } = req.cookies;
    let {currentUser}=req.cookies;
    let listings_ = await User.findById(id).populate("reviews");
    if (log == "off" || log == "review") {
        res.cookie("log", "edit");
        req.flash("error", "Please login before editing the listing.");
        return res.redirect("/login");
    } else if(currentUser!=listings_.owner){
        // res.cookie("log", "edit");
        req.flash("error", "You don't have permission to Edit.");
        return res.redirect(`/listings/${id}`);
    }else if (log == "in") {
        let listings_ = await User.findById(id);
        console.log(listings_);
        if (!listings_) {
            req.flash("error", "Listing you are looking for doesn't exists!");
            res.redirect("/listings");
        } 
        else {
            res.render("listings/edit.ejs", { data: listings_ });
        }
    }
}



module.exports.updateInfoRoute=async (req, res, next) => {
    let { id } = req.params;
    let { title_, descrip_, url_, price_, location_, country_ } = req.body;
    let result = schema.validate(req.body);
    if (result.error) {
        throw new ExpressError(500, result.error);
    }
    await User.findByIdAndUpdate(id, {
        title: title_,
        description: descrip_,
        image: {
            filename: "imagefile",
            url: url_,
        },
        price: price_,
        location: location_,
        country: country_
    }).then((res_) => {
        // console.log(res);
        // console.log("UPDATION SUCCESSFUL.");
        req.flash("success", "Listing Updated Successully!");
        res.redirect(`/listings/${id}`);
    });
}