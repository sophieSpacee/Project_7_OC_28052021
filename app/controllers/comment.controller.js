const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;
const Gif = db.gifs;
const User = db.users;

exports.create = (req, res) => {
    if (!req.body.content || !req.body.userId || !req.body.gifId) {
      res.status(400).send({
        message: "Content can not be empty!",
        code: "EMPTYCONTENT"
      });
      return;
    }
    const comment = {
      content: req.body.content,
      GifId: req.body.gifId,
      UserId: req.body.userId
    };

    Comment.create(comment)
      .then(data => {
        Gif.findByPk(req.body.gifId, {include: [
          {
            model: Comment,
            as: "comments",
            include: [
              {
                model: User,
                as: "author",
              }
            ],
          },
          {
            model: User,
            as: "author"
          }
        ],})
        .then((data) => {
          res.send({
            gif: data,
            message: "Gif commented",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error retrieving gif with id=" + id,
            code: "UPDATEFAILED",
          });
        });
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

