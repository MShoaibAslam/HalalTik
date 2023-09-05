require("dotenv").config();

const devEnv = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 3500,
  secrectKey: process.env.SECRET_KEY,
  dbUrl: process.env.MONGO_URL,
  mongoUrl: process.env.MONGO_URL,
  mongoUrlRemote: process.env.MONGO_URL_REMOTE,
  timezoneKey: process.env.TIMEZONE_KEY,
};

module.exports = devEnv;
