const Round = require("../models/round");
const { NotFoundError } = require("../utils/errors");

exports.getAllRounds = async () => {
  return await Round.find().populate("course");
};

exports.getRoundById = async (id) => {
  return await Round.findById(id).populate("course");
};

exports.createRound = async (roundData) => {
  const round = new Round(roundData);
  return await round.save();
};

exports.replaceRound = async (id, roundData) => {
  const roundUpdated = await Round.findByIdAndUpdate(id, roundData, {
    new: true,
    runValidators: true,
  }).populate("course");
  if (!roundUpdated) {
    throw new NotFoundError(`Round not found`);
  }
  return roundUpdated;
};

exports.updateRound = async (id, roundData) => {
  return await Round.findByIdAndUpdate(id, roundData, { new: true }).populate(
    "course"
  );
};

exports.deleteRound = async (id) => {
  const response = await Round.findByIdAndDelete(id).populate("course");
  if (!response) {
    throw new NotFoundError("round with id is not found");
  }
  return response;
};
