const router = require("express").Router();

const { categoryValidation } = require("../validation/category.validation");

const {
	createCategory,
	getCategory,
} = require("../controller/category.controller");

const auth = require("../auth/verify.auth");

/** Create Category */
router.post("/", auth, categoryValidation, createCategory);

/** Get Category */
router.get("/", getCategory);

module.exports = router;
