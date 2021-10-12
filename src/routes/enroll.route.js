const router = require("express").Router();

// const {  } = require("../validation/category.validation");

const {
	enrollCourse,
	getEnrolledCourseStatus,
	updateWeekStatus,
	getUserEnrolledCourse,
	certificateVerify,
} = require("../controller/enroll.controller");

const auth = require("../auth/verify.auth");

/** Enroll Course */
router.post("/", auth, enrollCourse);

/** Get Enrolled Course Status */
router.get("/:courseId", auth, getEnrolledCourseStatus);

/** Update Enrolled Course Week status */
router.patch("/", auth, updateWeekStatus);

/** Get User Enrolled Courses */
router.get("/course/me", auth, getUserEnrolledCourse);

/** Get Certificate Verification Status */
router.get("/verify/certificate/:enrollId", certificateVerify);

module.exports = router;
