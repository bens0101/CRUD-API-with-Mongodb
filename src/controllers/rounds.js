const roundService = require("../services/rounds");

const create = async (req, res, next) => {
  try {
    // getting the data from the request
    const newRound = await roundService.create(req.sanitizedBody, req.user._id);

    // send a response
    res.status(201).json({
      data: newRound,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const rounds = await roundService.getAll();

    res.json({
      data: rounds,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const round = await roundService.getById(id);

    res.json({ data: round });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRound = await roundService.updateOne(id, req.sanitizedBody);

    res.json({
      data: updatedRound,
    });
  } catch (err) {
    next(err);
  }
};

const replaceOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const replacedRound = await roundService.replaceOne(id, req.sanitizedBody);

    res.json({
      data: replacedRound,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRound = await roundService.deleteOne(id);
    res.json({
      data: deletedRound,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  replaceOne,
  deleteOne,
};
