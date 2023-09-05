const { createLogger, format, transports } = require("winston");

const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  level: "debug",
  format: combine(
    label({ label: "HalalTik-Service" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    prettyPrint()
  ),
  transports: [new transports.Console()],
});

module.exports = logger;
