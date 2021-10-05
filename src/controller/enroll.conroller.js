/**********************************
 * Create Course
 **********************************/
const enrollCourse = async (req, res, next) => {
	try {
		const enroll = new Enroll(req.body);

		await enroll.save();

		res.status(201).send({ data: enroll });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	enrollCourse,
};
