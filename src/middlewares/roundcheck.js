const passport = require("passport");
const Round = require("../models/rounds");
const { NotFoundError, ForbiddenError } = require("../utils/errors");

const RoundCheck = async (req, res, next) => {
  try {
    const round = await Round.findById(req.params.id);
    if (!round) {
      return next(new NotFoundError("Round not found"));
    }

    if (round.user._id.toString() !== req.user._id.toString()) {
      throw new ForbiddenError(`Not your round`);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = RoundCheck;
