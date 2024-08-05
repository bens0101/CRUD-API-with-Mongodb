const { model, Schema } = require("mongoose");

const roundSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      minLength: 3,
      maxLength: 64,
    },
    scores: {
      type: [Number],
      required: true,
      validate: [(scores) => scores.length === 18, "18 scores are needed"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Round", roundSchema);
