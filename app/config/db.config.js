module.exports = {
    HOST: "localhost",
    USER: process.env.DB_User,
    PASSWORD: process.env.DB_Password,
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };