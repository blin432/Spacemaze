var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log("okay");
  res.send('OK');
});

module.exports = router;
