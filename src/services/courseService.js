const Course = require("../models/course");
const { NotFoundError } = require("../utils/errors");

exports.getAllCourses = async () => {
  return await Course.find();
};

exports.getCourseById = async (id) => {
  return await Course.findById(id);
};

exports.createCourse = async (courseData) => {
  const course = new Course(courseData);
  return await course.save();
};

exports.replaceCourse = async (id, roundData) => {
  const roundUpdated = await Course.findByIdAndUpdate(id, roundData, {
    new: true,
    runValidators: true,
  });

  if (!roundUpdated) {
    throw new NotFoundError(`Round not found`);
  }
  return roundUpdated;
};
exports.updateCourse = async (id, courseData) => {
  return await Course.findByIdAndUpdate(id, courseData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};
