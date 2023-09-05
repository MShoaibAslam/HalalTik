/* eslint-disable import/extensions */
const express = require("express");

const ConfigurationRouter = express.Router();
const ConfigurationController = require("../controllers/ConfigurationController");

ConfigurationRouter.route("/")
  .get(ConfigurationController.getConfigurations)
  .post(ConfigurationController.createConfiguration);
ConfigurationRouter.route("/:id")
  .get(ConfigurationController.getConfiguration)
  .patch(ConfigurationController.updateConfiguration)
  .delete(ConfigurationController.deleteConfiguration);
ConfigurationRouter.route("/delete/deletall").delete(
  ConfigurationController.deleteallConfigurations
);

module.exports = ConfigurationRouter;
