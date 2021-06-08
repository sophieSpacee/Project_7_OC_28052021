const db = require("../models");
const Gif = db.gifs;
const Comment = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require("fs");
const { NONAME } = require("dns");

exports.create = (req, res) => {
  if (!req.body.title || !req.file || !req.body.userId) {
    res.status(400).send({
      message: "All fields are required",
      code: "MISSINGFIELDS",
    });
    return;
  }
  const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
  };
  const extension = MIME_TYPES[req.file.mimetype];
  console.log(extension);
  if (extension == undefined) {
    res.status(400).send({
      message: "Wrong image format, must be in jpg, jpeg, png",
      code: "WRONGFORMAT",
    });
    return;
  }

  const gif = {
    title: req.body.title,
    image: `${req.protocol}://${req.get("host")}/app/images/${
      req.file.filename
    }`,
    UserId: req.body.userId,
    likes: 0,
    usersLiked: { usersId: [] },
  };

  Gif.create(gif)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Gif.",
      });
    });
};

exports.findAll = (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let limit = 10;
  Gif.findAndCountAll({
    include: [
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
    ],
    limit: limit,
    order: [["updatedAt", "DESC"]],
    offset: page * limit,
  })
    .then((data) => {
      res.send({
        gifs: data.rows,
        total_pages: Math.ceil(data.count / limit),
        per_page: limit,
        current_page: page,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving gifs.",
      });
    });
};

exports.like = (req, res) => {
  console.log("dans le controller like");
  const id = req.params.id;
  Gif.findByPk(id)
    .then((gif) => {
      console.log("dans le premier then");
      const userId = req.body.userId;
      const like = req.body.like;
      console.log(gif.usersLiked.usersId)
      const userIdInUsersLiked = gif.usersLiked.usersId.includes(userId);
      console.log(userIdInUsersLiked);
      if (like == 1 && userIdInUsersLiked) {
        console.log("in like = 0")
        gif.likes = gif.likes - 1;
        const indexOfUserIdLiked = gif.usersLiked.usersId.indexOf(userId);
        gif.usersLiked.usersId.splice(indexOfUserIdLiked, 1);
        Gif.update(
          { likes: gif.likes, usersLiked: gif.usersLiked },
         
          {
            where: { id: id },
          }
        )
          .then((num) => {
            if (num == 1) {
              Gif.findByPk(id)
                .then((data) => {
                  res.send({
                    gif: data,
                    message: "Gif liked",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message: "Error retrieving gif with id=" + id,
                    code: "UPDATEFAILED",
                  });
                });
            } else {
              res.send({
                message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                code: "UPDATEFAILED",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating User with id=" + id,
              code: "UPDATEFAILED",
            });
          });
      }
      if (like == 1 && !userIdInUsersLiked) {
        console.log("in like = 1")
        gif.likes = gif.likes + 1;
        console.log("gif.likes", gif.likes)
        console.log("gif.usersLiked.userId", gif.usersLiked.usersId)
        gif.usersLiked.usersId.push(userId);
        Gif.update(
          { likes: gif.likes, usersLiked: gif.usersLiked },
          {
            where: { id: id },
          }
        )
          .then((num) => {
            if (num == 1) {
              Gif.findByPk(id)
                .then((data) => {
                  res.send({
                    gif: data,
                    message: "Gif liked",
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message: "Error retrieving gif with id=" + id,
                    code: "UPDATEFAILED",
                  });
                });
            } else {
              console.log(num);
              res.send({
                message: `Cannot update Gif with id=${id}. Maybe Gif was not found or gif is empty!`,
                code: "UPDATEFAILED",
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating Gif with id=" + id,
              code: "UPDATEFAILED",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Gif with id=" + id,
        code: "UPDATEFAILED",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Gif.findByPk(id)
    .then((gif) => {
      const filename = gif.image.split("/images/")[1];
      fs.unlink(`app/images/${filename}`, () => {
        Gif.destroy({
          where: { id: id },
        })
          .then((num) => {
            if (num == 1) {
              res.send({
                message: "Gif was deleted successfully!",
              });
            } else {
              res.send({
                message: `Cannot delete Gif with id=${id}.`,
              });
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Could not delete Gif with id=" + id,
            });
          });
      });
    })
    .catch((err) => {
      res.status(404).send({
        message: "Gif not found",
      });
    });
};
