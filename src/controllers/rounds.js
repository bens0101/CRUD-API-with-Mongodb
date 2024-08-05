const roundService = require("../services/roundService");
const { NotFoundError, BadRequestError } = require("../utils/errors");

exports.getAllRounds = async (req, res) => {
  try {
    const rounds = await roundService.getAllRounds();
    res.status(200).json({ data: rounds });
  } catch (error) {
    console.error("Error in getAllRounds:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
};

exports.getRoundById = async (req, res) => {
  try {
    const round = await roundService.getRoundById(req.params.id);
    if (!round) {
      return res.status(404).json({ error: "Round not found" });
    }
    res.status(200).json({ data: round });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createRound = async (req, res) => {
  try {
    const { course, user, scores } = req.body;
    if (!Array.isArray(scores) || scores.length !== 18) {
      res.status(400).json({ error: error.message });
    }
    const round = await roundService.createRound({ course, user, scores });
    res.status(201).json({ data: round });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.replaceRound = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { course, user, scores } = req.body;

    if (!Array.isArray(scores) || scores.length !== 18) {
      throw new BadRequestError("Scores must be exactly 18 holes!");
    }

    const updatedRound = await roundService.replaceRound(id, {
      course,
      user,
      scores,
    });
    if (!updatedRound) {
      throw new NotFoundError("Round not found");
    }
    res.status(200).json({ data: updatedRound });
  } catch (error) {
    next(error);
  }
};

exports.updateRound = async (req, res) => {
  try {
    // Validate the request body here if needed
    const updateData = req.body;

    const round = await roundService.updateRound(req.params.id, updateData);
    if (!round) {
      return res.status(404).json({ error: "Round not found" });
    }
    res.status(200).json({ data: round });
  } catch (error) {
    console.error("Error in updateRound:", error); // Log the error
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteRound = async (req, res) => {
  try {
    const round = await roundService.deleteRound(req.params.id);

    res.status(200).json({ data: round });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};