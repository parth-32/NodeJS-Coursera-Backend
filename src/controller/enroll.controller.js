const { ObjectId } = require("bson");
const Course = require("../model/course.model");
const Enroll = require("../model/enroll.model");
/**********************************
 * Enroll Course
 **********************************/
const enrollCourse = async (req, res, next) => {
	try {
		const checkEnrolled = await Enroll.findOne({
			user: req.userData._id,
			course: req.body.course,
		});

		if (!checkEnrolled) {
			const weeks = await Course.findById(req.body.course).select(
				"weeks"
			);

			req.body.user = req.userData._id;
			req.body.week_status = weeks.weeks;
			const enroll = new Enroll(req.body);

			await enroll.save();

			await Course.findByIdAndUpdate(req.body.course, {
				$inc: { enroll_count: 1 },
			});

			return res.status(201).send({ data: enroll });
		}

		return res.send({ data: checkEnrolled });
	} catch (error) {
		next(error);
	}
};

const getEnrolledCourseStatus = async (req, res, next) => {
	try {
		const status = await Enroll.findOne({
			course: req.params.courseId,
		});
		// .populate({
		// 	path: "course",
		// 	select: "title",
		// })
		// .populate({
		// 	path: "user",
		// 	select: "name",
		// });

		res.send({ data: status });
	} catch (error) {
		next(error);
	}
};

const updateWeekStatus = async (req, res, next) => {
	try {
		const status = await Enroll.findOneAndUpdate(
			{
				course: ObjectId(req.body.courseId),
				user: req.userData._id,
				"week_status._id": ObjectId(req.body.weekId),
			},
			{
				$set: {
					"week_status.$.finished": true,
				},
			},
			{
				returnOriginal: false,
			}
		);

		res.send({
			data: status,
		});
	} catch (error) {
		next(error);
	}
};

const getUserEnrolledCourse = async (req, res, next) => {
	try {
		const courses = await Enroll.find({
			user: ObjectId(req.userData._id),
		}).populate({
			path: "course",
			select: "title offer_by type thumbnail",
		});

		res.send({
			data: courses,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	enrollCourse,
	getEnrolledCourseStatus,
	updateWeekStatus,
	getUserEnrolledCourse,
};
