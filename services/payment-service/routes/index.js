var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/_health', function (req, res, next) {
  res.json(200, {
    status: 'ok'
  });
});

module.exports = router;
