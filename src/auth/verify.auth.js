const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization")?.split(" ")[1];
		if (!token) {
			throw new Error("Unauthorized access. Access Denied");
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const user = await User.findOne({
			_id: decoded._id,
			"tokens.token": token,
		});
		if (!user) {
			throw new Error("Token Invalid. Access Denied");
		}

		req.token = token;
		req.userData = user;

		next();
	} catch (error) {
		next(error);
	}
};

module.exports = auth;
