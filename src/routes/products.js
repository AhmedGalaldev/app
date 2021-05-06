const express = require("express");
const passport = require("passport");

const router = express.Router();

const {
  getAllProducts,
  buyProduct,
  cancelOperation,
} = require("../controllers/product");

router
  .route("/products")
  .get(passport.authenticate("jwt", { session: false }), getAllProducts);
router
  .route("/products/:id")
  .post(passport.authenticate("jwt", { session: false }), buyProduct);
router
  .route("/products/:id/canceled")
  .post(passport.authenticate("jwt", { session: false }), cancelOperation);

module.exports = router;
