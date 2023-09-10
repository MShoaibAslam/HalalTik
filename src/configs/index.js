require("dotenv").config();

const devEnv = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 3500,
  secrectKey: process.env.SECRET_KEY,
  dbUrl: process.env.MONGO_URL,
  mongoUrl: process.env.MONGO_URL,
  mongoUrlRemote: process.env.MONGO_URL_REMOTE,
  timezoneKey: process.env.TIMEZONE_KEY,
  JWT_SECRET: process.env.JWT_SECRET_KEY,
  Google_Client_Id: process.env.GOOGLE_Client_ID,
  Google_Client_Secret: process.env.GOOGLE_Client_secret,
};

module.exports = devEnv;
