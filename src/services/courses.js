const { ObjectId } = require("mongodb");

const Course = require("../models/courses");
const { NotFoundError, BadRequestError } = require("../utils/errors");

const create = async (input) => {
  const newCourse = new Course(input);
  await newCourse.save();

  return newCourse;
};

const getAll = async () => {
  const courses = await Course.find();
  return courses;
};

const getById = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new NotFoundError(`Course with id ${courseId} not found`);
  }
  return course;
};

const updateOne = async (courseId, input) => {
  const updatedCourse = await Course.findByIdAndUpdate(courseId, input, {
    new: true,
    runValidators: true,
  });

  if (!updatedCourse) {
    throw new NotFoundError(`Course with id ${courseId} not found`);
  }

  return updatedCourse;
};

const replaceOne = async (courseId, input) => {
  if (Object.keys(input).length === 0) {
    throw new BadRequestError("No input data");
  }

  const replacedCourse = await Course.findOneAndUpdate(
    { _id: courseId },
    input,
    {
      new: true,
      runValidators: true,
      overwrite: true,
    }
  );

  if (!replacedCourse) {
    throw new NotFoundError(`Course with id ${courseId} not found`);
  }

  return replacedCourse;
};

const deleteOne = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) {
    throw new NotFoundError(`Course with id ${courseId} not found`);
  }

  await Course.deleteOne({ _id: new ObjectId(courseId) });
  return course;
};

module.exports = {
  create,
  getAll,
  getById,
  updateOne,
  replaceOne,
  deleteOne,
};
