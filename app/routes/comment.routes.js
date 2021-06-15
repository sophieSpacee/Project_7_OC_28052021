module.exports = (app) => {
  const comments = require("../controllers/comment.controller.js");
  const auth = require("../middleware/auth");

  var router = require("express").Router();

  router.post("/", auth, comments.create);

  router.delete("/:id", auth, comments.delete);

  app.use("/api/gifs/:id/comments", router);
};
