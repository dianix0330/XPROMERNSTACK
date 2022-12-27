module.exports = (app) => {
  const users = require("../controllers/user.controller");

  var router = require("express").Router();

  router.get("/login", users.login);

  router.get("/users", users.getUsers);

  router.post("/users", users.getUserByRole);

  router.post("/users/create", users.createUser);

  app.use(router);
};
