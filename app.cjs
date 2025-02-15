let express = require("express");
const mongoose = require("mongoose");
let app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")))
const ExpressError = require("./utils/ExpressError.cjs");
const User = require("./models/user.cjs");

const listings_ = require("./routes/listing.cjs");
const reviews_ = require("./routes/reviews.cjs");
const user_ = require("./routes/userRouter.cjs");

const session = require("express-session");
const flash = require("connect-flash");


app.engine("ejs", ejsMate);

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}



main().then(() => {
    console.log("Connection Successful ! ");
}).catch((err) => {
    console.log(err);
})


app.listen(port, (req, res) => {
    console.log("Server is listening to : ", port);
});



let sessionObj = {
    secret: "mysecretCode",
    resave: false,
    saveUninitialized: true
}



app.use(session(sessionObj));
app.use(flash());




app.use((req, res, next) => {
    res.locals.message = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/",(req,res)=>{
    res.redirect("/listings");
})

//Routers---->>>
app.use("/listings", listings_);
app.use("/listings/:id/reviews", reviews_);
app.use("", user_);


app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong!" } = err;
    res.status(status).render("error.ejs", { err });
});


app.all("*", (req, res) => {
    throw new ExpressError(404, "Page not found!");
});