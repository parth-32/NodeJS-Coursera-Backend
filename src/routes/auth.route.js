const router = require("express").Router();

const {
	registerValidation,
	loginValidation,
} = require("../validation/auth.validation");

const { register, login } = require("../controller/auth.controller");

/** Register */
router.post("/register", registerValidation, register);

/** Login */
router.post("/login", loginValidation, login);

module.exports = router;
