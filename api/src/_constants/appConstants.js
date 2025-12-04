const appConstants = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: process.env.JWT_EXPIRATION,
  mongoUri: process.env.MONGO_URI,
};

verifyEnvVariables(appConstants);
function verifyEnvVariables(appConstants) {
  if (process.env.NODE_ENV === "development") {
    console.table(appConstants);
  }
  if (Object.values(appConstants).some((value) => value === undefined)) {
    console.error("Missing environment variables");
    process.exit(1);
  }
}
module.exports = appConstants;
