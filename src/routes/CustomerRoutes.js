/* eslint-disable import/extensions */
const express = require("express");

const CustomerRouter = express.Router();
const CustomerController = require("../controllers/CustomerController");

CustomerRouter.route("/")
  .get(CustomerController.getCustomers)
  .post(CustomerController.createCustomer);
CustomerRouter.route("/:id")
  .get(CustomerController.getCustomer)
  .patch(CustomerController.updateCustomer)
  .delete(CustomerController.deleteCustomer);
CustomerRouter.route("/delete/deletall").delete(
  CustomerController.deleteallCustomers
);

module.exports = CustomerRouter;
