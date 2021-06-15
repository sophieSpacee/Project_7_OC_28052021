module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    first_name: Sequelize.STRING(30),
    last_name: Sequelize.STRING(30),
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
  });

  return User;
};
