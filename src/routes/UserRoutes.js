/* eslint-disable import/extensions */
const express = require("express");

const UserRouter = express.Router();
const UserController = require("../controllers/UserController");

UserRouter.route("/")
  .get(UserController.getUsers)
  .post(UserController.createUser);
UserRouter.route("/:id")
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);
UserRouter.route("/delete/deletall").delete(UserController.deleteallUsers);

module.exports = UserRouter;
