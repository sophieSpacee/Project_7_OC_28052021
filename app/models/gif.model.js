module.exports = (sequelize, Sequelize) => {
    const Gif = sequelize.define("Gifs", {
          title: {
            type: Sequelize.STRING(300),
            allowNull: false,
          },
          image: {
            type: Sequelize.BLOB,
            allowNull: false,
          },
        
    });
  
    return Gif;

   
  
  };