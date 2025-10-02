const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.get("/test", (req, res) => {
  res.send("This is a test route");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 5 }),
  body("password").trim().isLength({ min: 6 }),
  body("username").trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);

    console.log(req.body);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Invalid Data!" });
    }

    res.send("Registration successful!");
  }
);
module.exports = router;
