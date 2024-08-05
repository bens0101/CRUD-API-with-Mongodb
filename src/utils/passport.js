"use strict";

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

passport.use(
  new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  async (_accessToken, _refreshToken, profile, cb) => {
    try {
      const user = await User.findOneAndUpdate(
        { googleId: profile.id },
        { $set: { name: profile.displayName, googleId: profile.id } },
        { upsert: true, new: true }
      );
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    cb(err, user);
  });
});

module.exports = passport;