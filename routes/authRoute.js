const express = require("express");
const router = express.Router();
const passport = require("passport");
const auth = require("../config/auth");
const { forwardAuthenticated } = require("../config/auth");
const User = require("../models/userSchema");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

router.get("/register", (req, res) => {
  res.render("register");
});

const authController = require("../controllers/authController");

router.post("/register", authController.register);

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
