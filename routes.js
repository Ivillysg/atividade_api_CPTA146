const express = require("express");
const routes = express.Router();
const UserController = require("./app/controllers/UserController");

routes.get("/users", UserController.index);

routes.post("/users", UserController.store);

routes.get("/users/:id", UserController.show);

routes.patch("/users/:id", UserController.update);

routes.delete("/users/:id", UserController.destroy);

module.exports = routes;
