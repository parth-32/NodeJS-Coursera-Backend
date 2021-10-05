const Category = require("../model/category.model");
const { find } = require("../model/user.model");

/**********************************
 * Create Category
 **********************************/
const createCategory = async (req, res, next) => {
	try {
		const category = new Category(req.body);

		await category.save();

		res.status(201).send({ data: category });
	} catch (error) {
		next(error);
	}
};

const getCategory = async (req, res, next) => {
	try {
		const result = await Category.find();

		res.send({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createCategory,
	getCategory,
};
