const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } }).catch((err) => {
      console.log("Error: ", err);
    });

    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 8);

    const user = new User({ name, email, password: hashed });

    const savedUser = await user.save().catch((err) => {
      console.log("Error: ", err);
      res.status(500).json({ error: "Cannot register user" });
    });

    if (savedUser) {
      return res.status(201).json({ message: "Thanks for registering" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
