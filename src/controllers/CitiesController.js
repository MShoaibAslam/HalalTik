const Cities = require("../models/CitiesModel");
const asyncHandler = require("../middleware/async");

const getCitiess = asyncHandler(async (req, res, next) => {
  const citiess = await Cities.find({});

  if (citiess === "") {
    res.status(404).json({
      status: false,
      message: "cities not found",
    });
  } else {
    res.status(200).json({
      status: true,
      message: "cities found",
      data: citiess,
    });
  }
});
const createCities = asyncHandler(async (req, res, next) => {
  const cities = await Cities.create(req.body);
  if (cities) {
    res.status(200).json({
      status: true,
      message: "cities created successfully",
      data: cities,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "internal server error",
    });
  }
});

const getCities = asyncHandler(async (req, res, next) => {
  const { id: citiesId } = req.params;
  const cities = await Cities.findOne({ _id: req.params.id });
  if (!cities) {
    res.status(200).json({ status: false, message: "cities not found " });
  } else {
    res
      .status(200)
      .json({ status: true, message: "cities found ", data: cities });
  }
});

const updateCities = asyncHandler(async (req, res, next) => {
  const cities = await Cities.findOne({ _id: req.params.id });
  if (cities) {
    await Cities.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then(async (citiess) => {
      if (citiess) {
        res.status(200).json({
          status: true,
          message: `cities updated `,
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
      message: `No cities found `,
    });
  }
});

const deleteCities = asyncHandler(async (req, res, next) => {
  const cities = await Cities.findOne({ _id: req.params.id });
  if (cities) {
    await Cities.findByIdAndDelete(req.params.id).then(async () => {
      res.status(200).json({
        status: true,
        message: `Delete cities `,
      });
    });
  } else {
    res.status(404).json({
      status: false,
      message: `cities not found `,
    });
  }
});
const deleteallCitiess = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const citiess = await Cities.deleteMany({ _id: { $in: id } });
  if (citiess) {
    res.status(200).json({
      status: true,
      message: "all citiess deleted",
    });
  } else {
    res.status(200).json({
      status: false,
      message: "internal server error",
    });
  }
});
module.exports = {
  getCitiess,
  createCities,
  getCities,
  updateCities,
  deleteCities,
  deleteallCitiess,
};
