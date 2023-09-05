/* eslint-disable import/extensions */
const express = require("express");

const CompanyRouter = express.Router();
const CompanyController = require("../controllers/CompanyController");

CompanyRouter.route("/")
  .get(CompanyController.getCompanys)
  .post(CompanyController.createCompany);
CompanyRouter.route("/:id")
  .get(CompanyController.getCompany)
  .patch(CompanyController.updateCompany)
  .delete(CompanyController.deleteCompany);
CompanyRouter.route("/delete/deletall").delete(
  CompanyController.deleteallCompanys
);

module.exports = CompanyRouter;
