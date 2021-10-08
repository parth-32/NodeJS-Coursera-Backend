const router = require("express").Router();

// const {  } = require("../validation/category.validation");

const {
	createCourse,
	getCourse,
	getCourseById,
	updateCourse,
	getAllCourse,
} = require("../controller/course.controller");

const auth = require("../auth/verify.auth");

/** Create Course */
router.post("/", auth, createCourse);

/** Update Course */
router.patch("/", auth, updateCourse);

/** Get Course by category */
router.get("/:categoryId", getCourse);

/** Get Course by course Id */
router.get("/id/:courseId", getCourseById);

/** Get All Course (with filtration query)
 * filter = popular
 * filter = recent
 * filter = top_rated
 * level = advanced,mixed,intermediate, beginner
 * language = english,hindi, ...
 */
router.get("/all/query", getAllCourse);

module.exports = router;
