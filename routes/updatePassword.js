var express = require('express');
var router = express.Router();

const updatePasswordModel = require('../models/updatePassword.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
