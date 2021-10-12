const e = require("express");
const Enroll = require("../model/enroll.model");
const User = require("../model/user.model");

/**********************************
 * REGISTER
 **********************************/
const register = async (req, res, next) => {
	try {
		const user = new User(req.body);

		/** Check User Exist or Not  **/
		const checksEmail = await User.findOne({ email: user.email });

		if (checksEmail) {
			throw new Error("Email Address already registered");
		}

		/** All Ok */
		await user.save();

		const token = await user.generateJwtToken();
		await user.hashPassword(req.body.password);

		res.status(201).send({ data: await user.getPublicData(), token });
	} catch (error) {
		next(error);
	}
};

/**********************************
 * LOGIN
 **********************************/
const login = async (req, res, next) => {
	try {
		const user = await User.findByCredentials(
			req.body.email,
			req.body.password
		);
		const token = await user.generateJwtToken();

		return res.status(200).send({
			data: await user.getPublicData(),
			token,
		});
	} catch (error) {
		next(error);
	}
};

const profile = async (req, res, next) => {
	try {
		const profile = await Enroll.find({
			user: req.userData._id,
		}).populate({
			path: "course",
			select: "title offer_by",
		});
		const summary = await Enroll.find({ user: req.userData._id });

		const in_progress = summary.filter((data) =>
			data.week_status.some((status) => status.finished === false)
		).length;

		const completed = summary.filter((data) =>
			data.week_status.every((status) => status.finished === true)
		).length;

		res.send({
			data: {
				user: await req.userData.getPublicData(),
				total_course: profile,
				summary: {
					enrolled: summary.length,
					in_progress,
					completed,
				},
			},
		});
	} catch (error) {
		next(error);
	}
};

const check = async (req, res, next) => {
	try {
		res.status(200).send({
			data: "done",
		});
	} catch (error) {
		res.status(400).send({
			data: "error",
		});
	}
};

module.exports = { register, login, profile, check };
