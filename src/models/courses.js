const { model, Schema } = require("mongoose");

const holeSchema = new Schema(
  {
    par: {
      type: Number,
      required: true,
      min: 3,
      max: 5,
    },
    distance: {
      type: Number,
      required: true,
      min: 0,
      max: 999,
    },
  },
  {
    _id: false,
  }
);

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 250,
    },
    holes: {
      type: [holeSchema],
      required: true,
      validate: [(holes) => holes.length === 18, "18 holes are needed"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Course", courseSchema);
