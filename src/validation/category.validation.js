const joi = require("joi");

/**********************************
 *CATEGORY VALIDATION
 **********************************/
const categorySchema = joi.object({
	name: joi.string().min(3).max(50).required(),
	image: joi.string().required(),
});

const categoryValidation = async (req, res, next) => {
	try {
		await categorySchema.validateAsync(req.body);
		next();
	} catch (err) {
		return res.status(400).send({
			error: err.message,
		});
	}
};

module.exports = { categoryValidation };
