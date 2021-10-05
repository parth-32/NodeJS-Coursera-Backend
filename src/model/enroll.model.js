const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
            trim: true,
            ref="Users"
		},
        course: {
            type: mongoose.Schema.Types.ObjectId,
			required: true,
            trim: true,
            ref="Course"
        },
		status: [
			{
                weekId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
				},
				finished: {
					type: Boolean,
					required: true,
					default: false
				}
			},
		],
	},
	{
		timestamps: true,
	}
);

courseSchema.virtual("user_id", {
	ref: "Users",
	localField: "user",
	foreignField: "_id",
});

courseSchema.virtual("week_id", {
	ref: "Course",
	localField: "status.weekId",
	foreignField: "weeks._id",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
