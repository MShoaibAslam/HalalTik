const Configuration = require("../models/ConfigurationModel");
const asyncHandler = require("../middleware/async");

const getConfigurations = asyncHandler(async (req, res, next) => {
  const configurations = await Configuration.find({})
    .populate("cityId")
    .populate("category")
    .populate("stateId");

  if (configurations === "") {
    res.status(404).json({
      success: false,
      message: "configuration not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "configuration found",
      data: configurations,
    });
  }
});
const createConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await Configuration.create(req.body);
  if (configuration) {
    res.status(200).json({
      success: true,
      message: "configuration created successfully",
      data: configuration,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "internal server error",
    });
  }
});

const getConfiguration = asyncHandler(async (req, res, next) => {
  const { id: configurationId } = req.params;
  const configuration = await Configuration.findOne({ _id: req.params.id })
    .populate("cityId")
    .populate("category")
    .populate("stateId");
  if (!configuration) {
    res
      .status(200)
      .json({ success: false, message: "configuration not found " });
  } else {
    res
      .status(200)
      .json({
        success: true,
        message: "configuration found ",
        data: configuration,
      });
  }
});

const updateConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await Configuration.findOne({ _id: req.params.id });
  if (configuration) {
    await Configuration.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then(async (configurations) => {
      if (configurations) {
        res.status(200).json({
          success: true,
          message: `configuration updated `,
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
      message: `No configuration found `,
    });
  }
});

const deleteConfiguration = asyncHandler(async (req, res, next) => {
  const configuration = await Configuration.findOne({ _id: req.params.id });
  if (configuration) {
    await Configuration.findByIdAndDelete(req.params.id).then(async () => {
      res.status(200).json({
        success: true,
        message: `Delete configuration `,
      });
    });
  } else {
    res.status(404).json({
      success: false,
      message: `configuration not found `,
    });
  }
});
const deleteallConfigurations = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const configurations = await Configuration.deleteMany({ _id: { $in: id } });
  if (configurations) {
    res.status(200).json({
      success: true,
      message: "all configurations deleted",
    });
  } else {
    res.status(200).json({
      success: false,
      message: "internal server error",
    });
  }
});
module.exports = {
  getConfigurations,
  createConfiguration,
  getConfiguration,
  updateConfiguration,
  deleteConfiguration,
  deleteallConfigurations,
};
