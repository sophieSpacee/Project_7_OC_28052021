module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("Comments", {
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Comment;
};
