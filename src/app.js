const express = require("express");
const path = require("path");

require("dotenv/config");

const app = express();
const cors = require("cors");

const expresssession = require("express-session");
const MongoStore = require("connect-mongo");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const mongoose = require("mongoose");
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
app.use("/api/v1/halaltik/auth", authRoutes);

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
