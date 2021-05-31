module.exports = app => {
    const gifs = require("../controllers/gif.controller.js");
    const auth = require('../middleware/auth')
    const multer = require('../middleware/multer');
  
    const router = require("express").Router();
  
    router.post("/", auth, multer, gifs.create);
  
    router.get("/", auth, gifs.findAll);

    router.post("/:id/like", auth, gifs.like);
  
    router.delete("/:id", auth, multer, gifs.delete);
  
    app.use('/api/gifs', router);
  };