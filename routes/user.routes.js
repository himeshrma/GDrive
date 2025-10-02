const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  res.send("This is a test route");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post(
  "/register",
  body("email").trim().isEmail().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 6 }),
  body("username").trim().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    console.log(req.body);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Invalid Data!" });
    }

    const { username, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: passwordHash,
    });

    res.json(newUser);
  }
);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Invalid Data!" });
    }
    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password!" });
    }

    const token = jwt.sign(
      {
        userID: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    res.json({ token });
  }
);
module.exports = router;
