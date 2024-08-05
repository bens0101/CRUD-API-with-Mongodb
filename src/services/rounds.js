const { ObjectId } = require("mongodb");

const Round = require("../models/rounds");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const create = async (input, userId) => {
  const newRound = new Round({ ...input, user: userId });
  await newRound.save();

  return newRound;
};

const getAll = async () => {
  const rounds = await Round.find().populate("course user");
  return rounds;
};

const getById = async (roundId) => {
  const round = await Round.findById(roundId).populate("course user");
  if (!round) {
    throw new NotFoundError(`Round with id ${roundId} not found`);
  }

  return round;
};

const updateOne = async (roundId, input) => {
  const updatedRound = await Round.findByIdAndUpdate({ _id: roundId }, input, {
    new: true,
    runValidators: true,
  }).populate("course user");

  if (!updatedRound) {
    throw new NotFoundError(`Round with id ${roundId} not found`);
  }

  return updatedRound;
};

const replaceOne = async (roundId, input) => {
  if (Object.keys(input).length === 0) {
    throw new BadRequestError("No input data");
  }

  const replacedRound = await Round.findOneAndUpdate({ _id: roundId }, input, {
    new: true,
    runValidators: true,
    overwrite: true,
  }).populate("course user");

  if (!replacedRound) {
    throw new NotFoundError(`Round with id ${roundId} not found`);
  }

  return replacedRound;
};

const deleteOne = async (roundId) => {
  const round = await Round.findById(roundId).populate("course user");

  if (!round) {
    throw new NotFoundError(`Round with id ${roundId} not found`);
  }

  await Round.deleteOne({ _id: new ObjectId(roundId) });
  return round;
};

module.exports = {
  create,
  getAll,
  getById,
  updateOne,
  replaceOne,
  deleteOne,
};
