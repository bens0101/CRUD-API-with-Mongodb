"use strict";

const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

passport.use(new BearerStrategy(async (token, done) => {
  try {
    console.log("Received token:", token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decodedToken);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error("Unauthorized");
    }
    done(null, user);
  } catch (error) {
    console.error("Token verification error:", error);
    done(error);
  }
}));

const isAuthenticated = (req, res, next) => {
  passport.authenticate("bearer", { session: false, failWithError: true })(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  });
};

module.exports = isAuthenticated;