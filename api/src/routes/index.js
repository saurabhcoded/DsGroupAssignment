var express = require('express');
var router = express.Router();

// Main Route
router.get('/', function(req, res, next) {
  res.json({ message: 'Hello World' });
});

module.exports = router;
