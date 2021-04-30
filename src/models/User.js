const Sequelize = require("sequelize");
const db = require("../database/database");

const User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.DOUBLE,
  },
});

module.exports = User;
