// authMiddleware.js
const jwt = require("jsonwebtoken");
const config = require("../configs/index");
const User = require("../models/UserModel");

exports.verifyToken = (req, res, next) => {
  if (req.path === "/api/v1/auth/login" && req.method === "POST") {
    return next();
  }

  let token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Token not provided" });
  }
  token = token.replace("Bearer ", "");

  const user = jwt.decode(token, config.JWT_SECRET, { algorithms: ["HS256"] });

  if (user) {
    User.findById(user?.user.id);
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json({ staus: false, message: "Invalid token" });
  }
};
