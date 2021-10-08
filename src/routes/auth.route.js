const router = require("express").Router();

const auth = require("../auth/verify.auth");

const {
	registerValidation,
	loginValidation,
} = require("../validation/auth.validation");

const { register, login, profile } = require("../controller/auth.controller");

/** Register */
router.post("/register", registerValidation, register);

/** Login */
router.post("/login", loginValidation, login);

/** Profile */
router.get("/profile/me", auth, profile);

module.exports = router;
