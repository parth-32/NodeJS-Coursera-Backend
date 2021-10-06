const mongoose = require("mongoose");

const enrollSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
		week_status: [
			{
				_id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					alias: "week",
				},
				finished: {
					type: Boolean,
					required: true,
					default: false,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

enrollSchema.virtual("user_id", {
	ref: "Users",
	localField: "user",
	foreignField: "_id",
});

enrollSchema.virtual("course_id", {
	ref: "Course",
	localField: "course",
	foreignField: "_id",
});

const Enroll = mongoose.model("Enroll", enrollSchema);

module.exports = Enroll;
