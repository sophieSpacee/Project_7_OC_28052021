module.exports = (sequelize, Sequelize) => {
  const Gif = sequelize.define("Gifs", {
    title: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(300),
      allowNull: false,
    },
    likes: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    usersLiked: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });

  return Gif;
};
