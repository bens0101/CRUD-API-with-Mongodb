const courseService = require("../services/courses");

const create = async (req, res, next) => {
  try {
    // getting the data from the request
    const newCourse = await courseService.create(req.sanitizedBody);

    // send a response
    res.status(201).json({
      data: newCourse,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const courses = await courseService.getAll();

    res.json({
      data: courses,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await courseService.getById(id);

    res.json({ data: course });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedCourse = await courseService.updateOne(id, req.sanitizedBody);

    res.json({
      data: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

const replaceOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedCourse = await courseService.replaceOne(id, req.sanitizedBody);

    res.json({
      data: updatedCourse,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCourse = await courseService.deleteOne(id);
    res.json({
      data: deletedCourse,
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
