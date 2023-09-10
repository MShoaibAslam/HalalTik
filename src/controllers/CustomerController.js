const Customer = require("../models/CustomerModel");
const asyncHandler = require("../middleware/async");

const getCustomers = asyncHandler(async (req, res, next) => {
  const customers = await Customer.find({});

  if (customers === "") {
    res.status(404).json({
      status: false,
      message: "customer not found",
    });
  } else {
    res.status(200).json({
      status: true,
      message: "customer found",
      data: customers,
    });
  }
});
const createCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.create(req.body);
  if (customer) {
    res.status(200).json({
      status: true,
      message: "customer created successfully",
      data: customer,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "internal server error",
    });
  }
});

const getCustomer = asyncHandler(async (req, res, next) => {
  const { id: customerId } = req.params;
  const customer = await Customer.findOne({ _id: req.params.id })
    .populate("cityId")
    .populate("category")
    .populate("stateId");
  if (!customer) {
    res.status(200).json({ status: false, message: "customer not found " });
  } else {
    res
      .status(200)
      .json({ status: true, message: "customer found ", data: customer });
  }
});

const updateCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findOne({ _id: req.params.id });
  if (customer) {
    await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then(async (customers) => {
      if (customers) {
        res.status(200).json({
          status: true,
          message: `customer updated `,
        });
      } else {
        res
          .status(404)
          .json({ status: false, message: `internal server error` });
      }
    });
  } else {
    res.status(404).json({
      status: false,
      message: `No customer found `,
    });
  }
});

const deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findOne({ _id: req.params.id });
  if (customer) {
    await Customer.findByIdAndDelete(req.params.id).then(async () => {
      res.status(200).json({
        status: true,
        message: `Delete customer `,
      });
    });
  } else {
    res.status(404).json({
      status: false,
      message: `customer not found `,
    });
  }
});
const deleteallCustomers = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const customers = await Customer.deleteMany({ _id: { $in: id } });
  if (customers) {
    res.status(200).json({
      status: true,
      message: "all customers deleted",
    });
  } else {
    res.status(200).json({
      status: false,
      message: "internal server error",
    });
  }
});
module.exports = {
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  deleteallCustomers,
};
