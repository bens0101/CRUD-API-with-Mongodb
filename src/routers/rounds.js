const { Router } = require("express");

const roundsController = require("../controllers/rounds");
const isValidObjectId = require("../middlewares/isValidObjectId");

const isAuthenticated = require("../middlewares/isAuthenticated");
const RoundCheck = require("../middlewares/roundcheck");

const roundsRouter = Router();

roundsRouter.use(isAuthenticated);

roundsRouter.get("/", roundsController.getAll);
roundsRouter.post("/", roundsController.create);

roundsRouter.get("/:id", isValidObjectId, RoundCheck, roundsController.getOne);
roundsRouter.put(
  "/:id",
  isValidObjectId,
  RoundCheck,
  roundsController.replaceOne
);
roundsRouter.patch(
  "/:id",
  isValidObjectId,
  RoundCheck,
  roundsController.updateOne
);
roundsRouter.delete(
  "/:id",
  isValidObjectId,
  RoundCheck,
  roundsController.deleteOne
);

module.exports = roundsRouter;
