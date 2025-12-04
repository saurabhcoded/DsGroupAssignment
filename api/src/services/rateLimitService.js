const rateLimit = require("express-rate-limit");

const rateLimitService = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  // store: ... ,
});

module.exports = rateLimitService;