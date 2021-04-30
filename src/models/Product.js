const Sequelize = require("sequelize");
const db = require("../database/database");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  brand: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DOUBLE,
  }
});


module.exports = Product;
