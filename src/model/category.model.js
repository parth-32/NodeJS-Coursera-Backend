const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
