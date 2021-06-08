const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

function encodeBase64(email) {
  const encodedWord = CryptoJS.enc.Utf8.parse(email);
  const encoded = CryptoJS.enc.Base64.stringify(encodedWord);
  return encoded;
}

exports.create = (req, res) => {
  console.log(req.body)
  if (
    !req.body.email ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.password
  ) {
    res.status(400).send({
      message: "All fields are required",
      code: "MISSINGFIELDS",
    });
    return;
  }
  const base64Email = encodeBase64(req.body.email);
  User.count({ where: { email: base64Email } }).then((count) => {
    console.log(count)
    if (count != 0) {
      res.status(400).send({
        message: "email already exists",
        code: "EMAILNOTUNIQUE",
      });
    }
  })
  .catch((err) => {
    console.log(err)
  });
  if (req.body.password.length < 6) {
    res.status(400).send({
      message: "password must be at least 6 characters",
      code: "PASSWORDTOOSHORT",
    });
  }
  if (!validator.validate(req.body.email)) {
    res.status(400).send({
      message: "email must be valid",
      code: "EMAILNOTVALID",
    });
  }

  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: base64Email,
      password: hash,
    };
    User.create(user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial.",
        });
      });
  });
};

exports.login = (req, res) => {
  if (
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({
      message: "All fields are required",
      code: "MISSINGFIELDS",
    });
    return;
  }
  const base64Email = encodeBase64(req.body.email);

  User.findAll({where: { email: base64Email } })
  .then((users) => {
    if(users.length == 0){
      res.status(401).send({
        message: 'Login failed',
        code: "LOGINFAILED"
      })
    }
    const user = users[0];
    bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).send({ message: "Login failed", code: "LOGINFAILED" });
          }
          const jwttoken = jwt.sign({ userId: user.id }, "RANDOM-TOKEN-SECRET", {
            expiresIn: "24h",
          })
          res.status(200).send({
            user: user,
            token: jwttoken,
            userId: user.id
          });
        })
        .catch((error) => {
          res.status(500).send({ message: "Login failed", code: "LOGINFAILED" })
        });
    })
    .catch((error) => res.status(500).send({ message: "Login failed", code: "LOGINFAILED" }));

}

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
        code: "USERNOTFOUND",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      console.log(req.body)
      if (num == 1) {
        User.findByPk(id)
          .then((data) => {
            res.send({
              user: data,
              message: "User was updated successfully.",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error retrieving User with id=" + id,
              code: "UPDATEFAILED"
            });
          });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
          code: "UPDATEFAILED"
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
        code: "UPDATEFAILED"
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("id", id)
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

