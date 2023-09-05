const Company = require("../models/CompanyModel");
const asyncHandler = require("../middleware/async");

const getCompanys = asyncHandler(async (req, res, next) => {
  const companys = await Company.find({})
    .populate("cityId")
    .populate("category")
    .populate("stateId");

  if (companys === "") {
    res.status(404).json({
      success: false,
      message: "company not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "company found",
      data: companys,
    });
  }
});
const createCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.create(req.body);
  if (company) {
    res.status(200).json({
      success: true,
      message: "company created successfully",
      data: company,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "internal server error",
    });
  }
});

const getCompany = asyncHandler(async (req, res, next) => {
  const { id: companyId } = req.params;
  const company = await Company.findOne({ _id: req.params.id })
    .populate("cityId")
    .populate("category")
    .populate("stateId");
  if (!company) {
    res.status(200).json({ success: false, message: "company not found " });
  } else {
    res
      .status(200)
      .json({ success: true, message: "company found ", data: company });
  }
});

const updateCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findOne({ _id: req.params.id });
  if (company) {
    await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then(async (companys) => {
      if (companys) {
        res.status(200).json({
          success: true,
          message: `company updated `,
        });
      } else {
        res
          .status(404)
          .json({ success: false, message: `internal server error` });
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: `No company found `,
    });
  }
});

const deleteCompany = asyncHandler(async (req, res, next) => {
  const company = await Company.findOne({ _id: req.params.id });
  if (company) {
    await Company.findByIdAndDelete(req.params.id).then(async () => {
      res.status(200).json({
        success: true,
        message: `Delete company `,
      });
    });
  } else {
    res.status(404).json({
      success: false,
      message: `company not found `,
    });
  }
});
const deleteallCompanys = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const companys = await Company.deleteMany({ _id: { $in: id } });
  if (companys) {
    res.status(200).json({
      success: true,
      message: "all companys deleted",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "internal server error",
    });
  }
});
module.exports = {
  getCompanys,
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany,
  deleteallCompanys,
};
