const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const holeSchema = new Schema(
  {
    par: { type: Number, required: true, min: 3, max: 5 },
    distance: { type: Number, required: true, min: 0, max: 999 },
  },
  { _id: false }
);

const courseSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 250 },
  holes: {
    type: [holeSchema],
    required: true,
    validate: [arrayLimit, "must have 18 holes"],
    default: undefined,
  },
});

function arrayLimit(val) {
  return val.length === 18;
}

module.exports = mongoose.model("Course", courseSchema);