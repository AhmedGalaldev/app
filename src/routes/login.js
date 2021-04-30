const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } }).catch((err) => {
    console.log("Error: ", err);
  });

  if(!user){
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
});

module.exports = router;






