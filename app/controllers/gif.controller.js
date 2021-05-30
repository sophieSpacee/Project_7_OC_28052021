const db = require("../models");
const Gif = db.gifs;
const Op = db.Sequelize.Op;
const fs = require('fs')

exports.create = (req, res) => {
  if (!req.body.title || !req.file) {
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

exports.findAll= (req, res) => {
  let page = parseInt(req.query.page) || 0;
  let limit = 2;
  Gif.findAndCountAll({
    limit: limit,
    order: [["updatedAt", "DESC"]],
    offset: page * limit
  })
    .then((data) => {
      
      res.send({
        gifs: data.rows,
        total_pages: Math.ceil(data.count/limit),
        per_page: limit,
        current_page: page
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving gifs.",
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
                message: `Cannot delete Gif with id=${id}. Maybe Tutorial was not found!`,
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
      message:  "Gif not found",
    });
  })
  
};
