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

module.exports = { register, login };
