const sendErrorDev = (err, res) => {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	const statusCode = err.statusCode || 500;

	// if production mode is activated and err.isOperational == false
	if (err.isOperational) {
		res.status(statusCode).json({
			message: err.message,
		});
	} else {
		res.status(statusCode).json({
			message: "Something gone wrong :(",
		});
	}
};

module.exports = (err, req, res, next) => {
	if (process.env.NODE_ENV === "dev") {
		sendErrorDev(err, res);
	} else {
		sendErrorProd(err, res);
	}
};
