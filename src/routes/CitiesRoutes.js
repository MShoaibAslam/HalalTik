/* eslint-disable import/extensions */
const express = require("express");

const CitiesRouter = express.Router();
const CitiesController = require("../controllers/CitiesController");

CitiesRouter.route("/")
  .get(CitiesController.getCitiess)
  .post(CitiesController.createCities);
CitiesRouter.route("/:id")
  .get(CitiesController.getCities)
  .patch(CitiesController.updateCities)
  .delete(CitiesController.deleteCities);
CitiesRouter.route("/delete/deletall").delete(
  CitiesController.deleteallCitiess
);

module.exports = CitiesRouter;
