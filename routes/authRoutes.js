const express = require("express");
const validate = require("../middlewares/validateRequest");
const { signupSchema, loginSchema } = require("../validations/authSchema");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
