const express = require("express");
const path = require("path");

require("dotenv/config");

const app = express();
const cors = require("cors");

const expresssession = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const mongoose = require("mongoose");
const FacebookStrategy = require("passport-facebook").Strategy;
// eslint-disable-next-line import/no-extraneous-dependencies
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const healthcheckRoute = require("./routes/healthcheck");

const env = require("./configs/index");
const logger = require("./middleware/logger");
const authMiddleware = require("./middleware/verifyToken");
const categoriesRoutes = require("./routes/CategoriesRoutes");
const citiesRoutes = require("./routes/CitiesRoutes");
const companyRoutes = require("./routes/CompanyRoutes");
const configurationRoutes = require("./routes/ConfigurationRoutes");
const customerRoutes = require("./routes/CustomerRoutes");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/AuthRoutes");
const User = require("./models/UserModel");

const url = env.mongoUrl;

const connect = mongoose.connect(url);

connect
  .then(() => {
    console.log("connected Correctly");
  })
  .catch((err) => console.log("mongo error", err));

app.use(
  expresssession({
    secret: env.secrectKey,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongoUrl: url }),
  })
);

app.use(cors({ origin: "*" }));
app.use(express.static("./assets"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

// app.use(responseTime);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Green-Me Official",
      version: "0.1.0",
      description: "API Routes and Database Schema for HalaTik-Official",
    },
    servers: [
      {
        url: `http://${env.host}/${env.port}`,
      },
    ],
  },
  apis: ["src/routes/healthcheck.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use((req, res, next) => {
  // Log the request
  logger.info(`[${req.method}] ${req.originalUrl}`);
  next();
});
// Configure Facebook authentication
passport.use(
  new FacebookStrategy(
    {
      clientID: "env.Facebook_Client_Id",
      clientSecret: "env.Facebook_Client_Secret",
      callbackURL: "http://localhost:3500/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // save the user
      console.log(profile);
      done(null, profile);
    }
  )
);

// Configure Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: env.Google_Client_Id,
      clientSecret: env.Google_Client_Secret,
      callbackURL: "http://localhost:3500/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // save that user
      console.log(profile);
      const user = await User.findOne({ username: profile.displayName });
      if (user) {
        user.profilepic = profile._json.picture;
        user.email = profile._json.email;
        await user.save();
      } else {
        const userCreated = new User();
        userCreated.username = profile.displayName;
        userCreated.profilepic = profile._json.picture;
        userCreated.email = profile._json.email;
        await userCreated.save();
      }
      done(null, profile);
    }
  )
);

// Configure Twitter authentication
passport.use(
  new TwitterStrategy(
    {
      consumerKey: env.Twitter_Client_Id,
      consumerSecret: env.Twitter_Client_Secret,
      callbackURL: "http://localhost:3500/auth/twitter/callback",
    },
    async (token, tokenSecret, profile, done) => {
      // For example, save the user to your database and call done(null, user);
      console.log(profile);
      const user = await User.findOne({ username: profile.displayName });
      if (user) {
        user.profilepic = profile._json.profile_image_url;
        await user.save();
      } else {
        const userCreated = new User();
        userCreated.username = profile.displayName;
        userCreated.profilepic = profile._json.profile_image_url;
        await userCreated.save();
      }
      done(null, profile);
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Define routes
app.get("/", (req, res) => {
  res.send("Home page");
});

// Redirect to Facebook login
app.get("/auth/facebook", passport.authenticate("facebook"));

// Facebook callback route
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Redirect to Google login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Redirect to Twitter login
app.get("/auth/twitter", passport.authenticate("twitter"));

// Twitter callback route
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.use("/api/v1/halaltik/auth", authRoutes);
app.use("/profile", authRoutes);
// app.use(authMiddleware.verifyToken);

app.use("/api/v1/halaltik/healthcheck", healthcheckRoute);
app.use("/api/v1/halaltik/categories", categoriesRoutes);
app.use("/api/v1/halaltik/cities", citiesRoutes);
app.use("/api/v1/halaltik/company", companyRoutes);
app.use("/api/v1/halaltik/configuration", configurationRoutes);
app.use("/api/v1/halaltik/customer", customerRoutes);
app.use("/api/v1/halaltik/user", userRoutes);

app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = "Route not found";
  next(err);
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "internal server error",
  });
  next();
});

module.exports = app;
