const express = require("express");
const roundController = require("../controllers/rounds");
const validateCourse = require("../middleware/validateCourse");
const validateRoundId = require("../middleware/validateId");
const router = express.Router();

router.get("/", roundController.getAllRounds);
router.post("/", roundController.createRound);
router.get("/:id", validateRoundId, roundController.getRoundById);
router.put("/:id", validateRoundId, roundController.replaceRound);
router.patch("/:id", validateRoundId, roundController.updateRound);
router.delete("/:id", validateRoundId, roundController.deleteRound);

module.exports = router; 
