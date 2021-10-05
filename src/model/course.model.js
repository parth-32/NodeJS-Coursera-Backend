const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
	{
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		thumbnail: {
			type: String,
			required: true,
			trim: true,
		},
		offer_by: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			required: true,
			trim: true,
		},
		rating: {
			type: Number,
			required: true,
			trim: true,
			default: 0,
		},
		rated_by: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				user_rate: {
					type: String,
				},
			},
		],
		enroll_count: {
			type: Number,
			required: true,
			trim: true,
			default: 0,
		},
		level: {
			type: String,
			required: true,
			trim: true,
			default: "Beginner",
		},
		languages: [
			{
				type: String,
				trim: true,
				default: "English",
			},
		],
		instructor: {
			type: String,
			required: true,
			trim: true,
		},
		skill_gain: [
			{
				type: String,
				trim: true,
			},
		],
		overview: {
			type: String,
			required: true,
			trim: true,
		},
		weeks: [
			{
				title: {
					type: String,
					trim: true,
				},
				video_url: {
					type: String,
					trim: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

courseSchema.virtual("category_id", {
	ref: "Category",
	localField: "category",
	foreignField: "_id",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
