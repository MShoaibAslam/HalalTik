/* eslint-disable import/extensions */
const express = require("express");

const UserRouter = express.Router();
const UserController = require("../controllers/UserController");

UserRouter.route("/login").post(UserController.login);
UserRouter.route("/register").post(UserController.createUser);

module.exports = UserRouter;
