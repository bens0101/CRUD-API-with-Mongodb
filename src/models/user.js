"use strict";

const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 64,
  },
  googleId: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = model("User", UserSchema);