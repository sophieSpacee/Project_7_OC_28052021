module.exports = app => {
    const comments = require("../controllers/comment.controller.js");
  
    var router = require("express").Router();
  
    // Create a new comments
    router.post("/", comments.create);
  
    // Delete a comment with id
    router.delete("/:id", comments.delete);
  
//Pas prévu dans l'application :

    // Retrieve all comments
    // router.get("/", comments.findAll);
  
    
  
    app.use('/api/comments', router);
  };