const bcrypt = require("bcryptjs");
// eslint-disable-next-line import/no-unresolved
const middleware = require("../middleware/Middleware");
const User = require("../models/UserModel");
const asyncHandler = require("../middleware/async");

const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  if (users === "") {
    res.status(404).json({
      status: false,
      message: "user not found",
    });
  } else {
    res.status(200).json({
      status: true,
      message: "user found",
      data: users,
    });
  }
});
const createUser = asyncHandler(async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  if (req.body.gender) {
    if (
      !(req.body.gender === "MALE") ||
      req.body.gender === "FEMALE" ||
      req.body.gender === "OTHER"
    ) {
      return res.status(400).json({
        status: false,
        message: "Gender must be MALE, FEMALE, OTHER",
      });
    }
  }
  const user = await User.create(req.body);
  if (user) {
    res.status(200).json({
      status: true,
      message: "user created successfully",
      data: user,
    });
  } else {
    res.status(404).json({
      status: false,
      message: "internal server error",
    });
  }
});

const getUser = asyncHandler(async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(200).json({ status: false, message: "user not found " });
  } else {
    res.status(200).json({ status: true, message: "user found ", data: user });
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).then(async (users) => {
      if (users) {
        res.status(200).json({
          status: true,
          message: `user updated `,
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
      message: `No user found `,
    });
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (user) {
    await User.findByIdAndDelete(req.params.id).then(async () => {
      res.status(200).json({
        status: true,
        message: `Delete user `,
      });
    });
  } else {
    res.status(404).json({
      status: false,
      message: `user not found `,
    });
  }
});
const deleteallUsers = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const users = await User.deleteMany({ _id: { $in: id } });
  if (users) {
    res.status(200).json({
      status: true,
      message: "all users deleted",
    });
  } else {
    res.status(200).json({
      status: false,
      message: "internal server error",
    });
  }
});
const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(200)
      .json({ status: false, message: "Invalid email or password" });
  }

  const payload = {
    user: {
      id: user._id,
      username: user.username,
    },
  };
  const token = middleware.getToken({ user: payload.user });
  user.token = token;
  await user.save();
  const userReturn = await User.findOne({ username });
  res.status(200).json({
    status: true,
    message: "successfully login",
    token,
    user: userReturn,
  });
});
module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteallUsers,
  login,
};
