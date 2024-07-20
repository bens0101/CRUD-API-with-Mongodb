const express = require("express");
const courseController = require("../controllers/course");
const router = express.Router();
const validateCourse = require("../middleware/validateCourse");
const validateRoundId = require("../middleware/validateId");

router.post("/", courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", validateRoundId, courseController.getCourseById);
router.put(
  "/:id",
  validateCourse,
  validateRoundId,
  courseController.replaceCourse
);
router.patch("/:id", validateRoundId, courseController.updateCourse);
router.delete("/:id", validateRoundId, courseController.deleteCourse);
module.exports = router;
