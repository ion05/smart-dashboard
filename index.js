// importing modules
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
// middleware
const app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

const session = require("express-session");
const passport = require("passport");
const User = require("./models/userSchema");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

require("./config/passport")(passport);

// db config
const DB_PASSWORD = process.env.DB_PASSWORD;
const db = `mongodb+srv://encryptid-dev:${DB_PASSWORD}@cluster0.510gr.mongodb.net/core-prelims`;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then();

// passport
app.use(passport.initialize());
app.use(passport.session());

// route imports
const homeRoute = require("./routes/homeRoute");
const spotifyRoute = require("./routes/spotifyRoute");
const registerRoute = require("./routes/authRoute");
const dashboardRoute = require("./routes/dashboardRoute");

// routes
app.use(homeRoute);
app.use(spotifyRoute.all);
app.use("/", registerRoute);
app.use("/dashboard", dashboardRoute);

// listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
