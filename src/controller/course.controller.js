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
		var limit;
		var skip;
		var match = { category: req.params.categoryId };

		//limit
		req.query?.limit && (limit = 4);

		//level
		const level = req.query?.level;
		level && (match.level = { $in: level.split(",") });
		//language
		const language = req.query?.language;
		language && (match.languages = { $in: language.split(",") });

		const page = req.query?.page;
		if (page) {
			limit = 4;
			skip = page * limit - limit;
		}
		// console.log(match);
		const category = await Category.findById(req.params.categoryId).select(
			"name"
		);

		const course = await Course.find(match)
			.select("-category")
			.limit((page && limit) || (req.query?.limit && limit))
			.skip(page && skip);

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

const getAllCourse = async (req, res, next) => {
	try {
		var sort = {};
		var match = {};
		var limit;
		var skip;
		//filter
		const filter = req.query?.filter;
		filter === "recent" && (sort.createdAt = -1);
		filter === "popular" && (sort.enroll_count = -1);
		filter === "top_rated" && (sort.rating = -1);
		//search
		const search = req.query?.search;
		search && (match.title = { $regex: search, $options: "i" });
		//level
		const level = req.query?.level;
		level && (match.level = { $in: level.split(",") });
		//language
		const language = req.query?.language;
		language && (match.languages = { $in: language.split(",") });
		// console.log(match);

		/*
		pagination
			?page=1 == 1-2 => limit(2).skip(0) = 1-2  => pageNum * limit(2) - 2 =>  1*2-2 = 0 <= skip
			?page=2 == 3-4 => limit(2).skip(2) = 3-4  => pageNum * limit(2) - 2 =>  2*2-2 = 2 <= skip
			?page=3 == 4-6 => limit(2).skip(4) = 5-6  => pageNum * limit(2) - 2 =>  3*2-2 = 4 <= skip
			?page=4 == 5-8 => limit(2).skip(6) = 7-8  => pageNum * limit(2) - 2 =>  4*2-2 = 6 <= skip
		*/

		const page = req.query?.page;
		if (page) {
			limit = 4;
			skip = page * limit - limit;
		}

		const course = await Course.find(match)
			.sort(sort)
			// .select("-skill_gain -weeks -overview -languages -rated_by")
			.limit(filter ? 6 : page && limit)
			.skip(page && skip)
			.populate({
				path: "category",
				select: "name",
			});

		return res.send({
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
	getAllCourse,
};
