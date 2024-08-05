const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roundSchema = new Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  scores: {
    type: [Number],
    required: true,
    validate: [arrayLimit, "must have 18 scores"],
  },
});

function arrayLimit(val) {
  return val.length === 18;
}

module.exports = mongoose.model("Round", roundSchema);