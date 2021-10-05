const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: 7,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

/** Method **/
userSchema.methods.getPublicData = async function () {
	const obj = {
		_id: this._id,
		name: this.name,
		email: this.email,
	};

	return obj;
};

userSchema.methods.generateJwtToken = async function () {
	const token = jwt.sign(
		{ _id: this._id.toString() },
		process.env.JWT_SECRET
	);

	this.tokens = this.tokens.concat({ token });

	// this.password = await bcrypt.hash(this.password, 8);

	await this.save();

	return token;
};

userSchema.methods.hashPassword = async function (password) {
	this.password = await bcrypt.hash(password, 8);

	await this.save();
};

/** Query **/
userSchema.statics.findByCredentials = async function (email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Invalid Credentials");
	}
	const isMatch = await bcrypt.compare(password, user.password);
	// console.log(isMatch);
	if (!isMatch) {
		throw new Error("Invalid Credentials");
	}

	return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
