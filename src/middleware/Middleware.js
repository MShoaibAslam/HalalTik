const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const Extractjwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const config = require("../configs/index");

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.use(
  new LocalStrategy((username, pass, done) => {
    User.findOne({ username })
      .then((user) => {
        console.log(user);
        done(null, user);
      })
      .catch((err) => {
        done(err, null);
      });
  })
);

passport.serializeUser((user, done) => {
  // console.log('FIRST ID', user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});
exports.getToken = (user) =>
  jwt.sign(user, config.JWT_SECRET, { expiresIn: 3600, algorithm: "HS256" });
exports.checkLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({ message: "Already Logout." });
    next();
  }
};
exports.isLocalAuthenticated = function (req, res, next) {
  // console.log(req,"is local authenticated");
  passport.authenticate("local", (err, user, info, done) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      next(new Error("User Doesn't Exist"));
    }
    next();
  })(req, res, next);
};
// exports.isAdmin = async (req, res, next) => {
//     try {
//         const user = req.user
//         if(user){
//             if (user?.role?.type === "Admin" || user?.role?.type === "Super Admin" ||
//                 user?.role?.type === "admin") {
//                     next();
//                 } else {
//                     res.send('You are not authorized to perform this operation!');
//                 }
//         }
//     }
//     catch (err) {
//         console.log("user error")
//         res.send('You are not authorized to perform this operation!');

//     }
// };
