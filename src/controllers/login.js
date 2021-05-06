const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.users;
const passport = require("passport");

const router = express.Router();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && passport) {
      return res
        .status(400)
        .json({ message: "Please enter email and password!" });
    }
    const user = await User.findOne({ where: { email } }).catch((err) => {
      console.log("Error: ", err);
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email or password does not match!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Unable to login" });
    }

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({ message: "Welcome Back!", token: jwtToken });
  } catch (e) {
    console.log(e);
  }
};

