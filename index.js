require("./src/db/mongoose.config");
require("dotenv").config();
const express = require("express");
const app = express();
// const port = process.env.PORT || 3000;
const port = 3210;
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const appError = require("./src/utils/appError");
const errorHandler = require("./src/utils/errorHandler");

app.use("/auth", require("./src/routes/auth.route"));
app.use("/category", require("./src/routes/category.route"));
app.use("/course", require("./src/routes/course.route"));
app.use("/enroll", require("./src/routes/enroll.route"));

app.all("*", (req, res) => {
	throw new appError(`Route: ${req.method} ${req.url} is not defined`, 404);
});
/**********************************
 * ERROR HANDLING
 **********************************/
app.use(errorHandler);

app.listen(port, () => console.log("Server listening on port : " + port));
