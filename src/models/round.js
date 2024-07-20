const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roundSchema = new Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  username: { type: String, required: true, minlength: 3, maxlength: 64 },
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
