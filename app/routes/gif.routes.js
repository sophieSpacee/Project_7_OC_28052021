module.exports = app => {
    const gifs = require("../controllers/gif.controller.js");
    const auth = require('../middleware/auth')
    const multer = require('../middleware/multer');
  
    const router = require("express").Router();
  
    // Create a new gif
    router.post("/", multer, gifs.create);
  
    // Retrieve all gifs
    router.get("/", gifs.findAll);
  
    // Delete a gif with id
    router.delete("/:id", multer, gifs.delete);
  
  
    app.use('/api/gifs', router);
  };