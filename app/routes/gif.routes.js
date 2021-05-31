module.exports = app => {
    const gifs = require("../controllers/gif.controller.js");
    const auth = require('../middleware/auth')
    const multer = require('../middleware/multer');
  
    const router = require("express").Router();
  
    router.post("/",  multer, gifs.create);
  
    router.get("/",  gifs.findAll);

    router.post("/:id/like",  gifs.like);
  
    router.delete("/:id",  multer, gifs.delete);
  
    app.use('/api/gifs', router);
  };