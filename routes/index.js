var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/cards', function(req, res, next) {
  res.render('cards', { title: 'Express' });
});

module.exports = router;
