const Course = require("../model/course.model");
const Category = require("../model/category.model");

/**********************************
 * Create Course
 **********************************/
const createCourse = async (req, res, next) => {
	try {
		const course = new Course(req.body);

		await course.save();

		res.status(201).send({ data: course });
	} catch (error) {
		next(error);
	}
};

const getCourse = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.categoryId).select(
			"name"
		);

		const course = await Course.find({
			category: req.params.categoryId,
		}).select("-category");

		res.status(201).send({
			data: {
				category,
				course,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getCourseById = async (req, res, next) => {
	try {
		const course = await Course.findById(req.params.courseId);

		res.status(201).send({
			data: course,
		});
	} catch (error) {
		next(error);
	}
};

const updateCourse = async (req, res, next) => {
	try {
		const course = await Course.findByIdAndUpdate(
			req.body.courseId,
			{
				weeks: req.body.weeks,
			},
			{
				returnOriginal: false,
			}
		);

		res.send({
			data: course,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createCourse,
	getCourse,
	getCourseById,
	updateCourse,
};
