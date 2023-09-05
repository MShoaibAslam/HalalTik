// eslint-disable-next-line import/no-extraneous-dependencies
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dquravbyl",
  api_key: "931628689931816",
  api_secret: "ZnRAebgc5Kk1AyKZeYF0Rq0aMBg",
});

module.exports = cloudinary;
