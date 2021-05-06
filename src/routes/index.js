const express = require("express");
const registerRouter = require("./register");
const loginRouter = require("./login")
const productRouter = require("./products");

const router = express.Router();


router.use(registerRouter);
router.use(loginRouter);
router.use(productRouter);



module.exports = router;