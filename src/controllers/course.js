const { request } = require("express");
const Course = require("../models/course");
const { NotFoundError, BadRequestError } = require("../utils/errors");
const courseService = require("../services/courseService");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.status(200).json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ data: course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { name, holes } = req.body;
    if (!name || !holes || holes.length !== 18) {
      throw new BadRequestError("Course must have a name and 18 holes.");
    }
    const course = await courseService.createCourse(req.body);
    res.status(201).json({ data: course });
  } catch (error) {
    console.error("Error in createCourse:", error);
    res.status(400).json({ error: error.message });
  }
};

exports.replaceCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, holes } = req.body;

    if (!name || !Array.isArray(holes) || holes.length !== 18) {
      throw new BadRequestError(
        "Name is required and holes must be an array of exactly 18 elements!"
      );
    }

    const updatedCourse = await courseService.replaceCourse(id, {
      name,
      holes,
    });
    if (!updatedCourse) {
      throw new NotFoundError("Course not found");
    }
    res.status(200).json({ data: updatedCourse });
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ data: course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ data: course });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
