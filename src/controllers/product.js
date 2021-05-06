const db = require("../models");
const Product = db.products;
const User = db.users;
const { Op } = require("sequelize");


exports.getAllProducts = async (req, res) => {
  try {
    const userData = await User.findByPk(req.user.id, {
      include: ["balance"],
    });

    const products = await Product.findAll({
      where: {
        price: {
          [Op.lte]: userData.balance.amount,
        },
      },
    }).catch((error) => {
      console.log(error);
    });
    return res.json(products);
  } catch (err) {
    return res.json({ message: err });
  }
};


exports.buyProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({
      where: { id: productId },
    }).catch((err) => {
      return res.json({ error: err });
    });
    const productPrice = product.price;
    const userData = await User.findByPk(req.user.id, {
      include: ["balance"],
    });

    if (productPrice <= userData.balance.amount) {
      userData.balance.amount = userData.balance.amount - productPrice;

      userData.balance.save();
      return res.json({ message: "success" });
    } else {
      return res.json({ message: "failed" });
    }
  } catch (err) {
    return res.json({ message: err });
  }
};

// cancel request


exports.cancelOperation = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findOne({
      where: { id: productId },
    }).catch((err) => {
      return res.json({ error: err });
    });
    const productPrice = product.price;
    const userData = await User.findByPk(req.user.id, {
      include: ["balance"],
    });
    userData.balance.amount = userData.balance.amount + productPrice;
    userData.balance.save();
    return res.json({ message: "canceled" });
  } catch (err) {
    return res.json({ message: err });
  }
};

