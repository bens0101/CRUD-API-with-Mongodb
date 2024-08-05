const { Router } = require("express");

const coursesController = require("../controllers/courses");
const isValidObjectId = require("../middlewares/isValidObjectId");

const coursesRouter = Router();

coursesRouter.get("/", coursesController.getAll);
coursesRouter.get("/:id", isValidObjectId, coursesController.getOne);

coursesRouter.post("/", coursesController.create);
coursesRouter.put("/:id", isValidObjectId, coursesController.replaceOne);
coursesRouter.patch("/:id", isValidObjectId, coursesController.updateOne);
coursesRouter.delete("/:id", isValidObjectId, coursesController.deleteOne);

module.exports = coursesRouter;
