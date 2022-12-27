const sql = require("./db.js");
const uuid = require("uuid");

const Users = function (user) {
  this.username = user.username;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.phone = user.phone;
  this.address = user.address;
  this.role = user.role;
  this.password = user.password;
};

Users.findByEmail = (email, result) => {
  sql.query(`SELECT * from users where email = "${email}"`, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_fount" }, null);
  });
};

Users.create = (newUser, result) => {
  const newId = uuid.v4();
  sql.query(
    "INSERT INTO users SET ?",
    { id: newId, ...newUser },
    (err, res) => {
      if (err) {
        console.log("error", err);
        result(err, null);
        return;
      }
      console.log("created user: ", {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
      });
      result(null, { id: newId, ...newUser });
    }
  );
};

Users.getUsers = (result) => {
  let query = `SELECT * FROM users WHERE role="client" or role="user"`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ".err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Users.getUsersForClient = (id, result) => {
  console.log(id);
  let query = `SELECT * FROM users WHERE clientid="${id}"`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ".err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Users.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Users.findByQuery = (name, result) => {
  sql.query(
    `SELECT id from users where email = "${name}" OR username = "${name}" OR firstname = "${name}" OR lastname = "${name}"`,
    (err, res) => {
      if (err) {
        console.log("error:", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user:", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_fount" }, null);
    }
  );
};

module.exports = Users;
