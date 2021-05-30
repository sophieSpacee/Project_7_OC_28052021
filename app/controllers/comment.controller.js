const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.content) {
      res.status(400).send({
        message: "Content can not be empty!",
        code: "EMPTYCONTENT"
      });
      return;
    }
    const comment = {
      content: req.body.content,
      GifId: req.params.id,
      UserId: req.body.userId
    };

    Comment.create(comment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Comment."
        });
      });
  };

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Comment was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Comment with id=${id}. `
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Comment with id=" + id
        });
      });
  };

