const Users = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET =
  "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

exports.createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const user = new Users({
    username: req.body.username || "",
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone || "",
    address: req.body.address || "",
    role: req.body.role || "user",
  });

  console.log("here:", user);

  //hash user password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  Users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occured while creating the user.",
      });
    else {
      const payload = {
        user: {
          id: data.id,
        },
      };

      console.log("result register", data);

      jwt.sign(payload, JWT_SECRET, { expiresIn: "7 days" }, (err, token) => {
        if (err) throw err;
        res.json({ token, user: data });
      });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.query;
  try {
    Users.findByEmail(email, async (err, data) => {
      if (err) {
        res.status(400).send({
          message: err.message || "Email or password incorrect",
        });
      } else {
        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
          res.status(400).send({
            message: "Email or password incorrect",
          });
        }
        const payload = {
          user: {
            id: data.id,
          },
        };

        console.log("result login", data);
        data.password = "";
        jwt.sign(payload, JWT_SECRET, { expiresIn: "7 days" }, (err, token) => {
          if (err) throw err;
          res.json({ token, user: data });
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
exports.getUserByRole = async (req, res) => {
  const role = req.body.role || "";
  const id = req.body.id || "";

  if (role) {
    if (role === "admin") {
      Users.getUsers((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials.",
          });
        else {
          res.send(data);
        }
      });
    } else if (role === "client") {
      Users.getUsersForClient(id, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving tutorials.",
          });
        else {
          res.send(data);
        }
      });
    }
  }
};

exports.getUsers = (req, res) => {
  const id = req.query.id || "";
  const name = req.query.search || "";

  if (id) {
    Users.findById(id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Tutorial with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Tutorial with id " + req.params.id,
          });
        }
      } else res.send(data);
    });
  } else if (name) {
    Users.findByQuery(name, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occured while searching user",
        });
      } else res.send(data);
    });
  } else {
    res.status(500).send({
      message: "Some error occurred while retrieving tutorials.",
    });
  }
};
