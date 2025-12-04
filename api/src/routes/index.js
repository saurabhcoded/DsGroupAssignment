var express = require('express');
const v1Router = require("./v1");
var router = express.Router();

// Main Route
router.get('/', function(req, res, next) {
  res.json({ message: 'Hello World' });
});

// Routing With Versioning
router.use('/v1', v1Router);
module.exports = router;
