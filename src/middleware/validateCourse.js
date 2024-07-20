const Course = require("../models/course");

const validateCourses = async (req, res, next) => {
  const { name, holes } = req.body;
  const course = new Course({ name, holes });

  try {
    await course.validate();
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateCourses;
