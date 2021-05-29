module.exports = app => {
    const gifs = require("../controllers/gif.controller.js");
  
    var router = require("express").Router();
  
    // Create a new gif
    router.post("/", gifs.create);
  
    // Retrieve all gifs
    router.get("/", gifs.findAll);
  
    // Retrieve a single gif with id
    router.get("/:id", gifs.findOne);
  
    // Update a gif with id
    router.put("/:id", gifs.update);
  
    // Delete a gif with id
    router.delete("/:id", gifs.delete);
  
  
    app.use('/api/gifs', router);
  };