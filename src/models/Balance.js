module.exports = (sequelize, DataTypes) => {

const Balance = sequelize.define("balance", {
  amount: {
    type: DataTypes.DOUBLE,
  },
});

return Balance
}
