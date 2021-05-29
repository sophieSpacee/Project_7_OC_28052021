module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require('../middleware/auth');
  
    var router = require("express").Router();
  
    router.post("/", users.create);

    router.post("/login", users.login);
     
    router.put("/:id", auth, users.update);
  
    router.delete("/:id", auth, users.delete);
  
    app.use('/api/users', router);
  };