const router = require("express").Router();

// const {  } = require("../validation/category.validation");

const { enrollCourse } = require("../controller/course.controller");

const auth = require("../auth/verify.auth");

/** Create Course */
router.post("/enroll", auth, enrollCourse);
module.exports = router;
