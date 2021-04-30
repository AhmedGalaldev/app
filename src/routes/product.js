const express = require("express");
const passport = require("passport");
const User = require("../models/User");
const Product = require("../models/Product");
const { Op } = require("sequelize");

const router = express.Router();

router.get(
  "/products",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          price: {
            [Op.lte]: req.user.balance,
          },
        },
      }).catch((error) => {
        console.log(error);
      });
      return res.json(products);
    } catch (err) {
      return res.json({ message: err });
    }
  }
);

router.post(
  "/products/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
        const productId=req.params.id;
        const product = await Product.findOne({
          where: { id: productId },
        }).catch((err) => {
          console.log(err);
        });
        const productPrice=product.price
        const user = req.user
        if (productPrice <= user.balance){

            user.balance = user.balance - productPrice;
            user.save()
            return res.json({message:"success"})
        }else{
            return res.json({ message: "failed" });

        }
        

    } catch (err) {
      return res.json({ message: err });
    }
  }
);
module.exports = router;
