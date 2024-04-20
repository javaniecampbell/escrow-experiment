var express = require('express');
var router = express.Router();
const os = require('os')
/* GET home page. */
router.get('/_health', function (req, res, next) {
  // calculates the heap memory used vs maximum

  const memoryUsed = process.memoryUsage().heapUsed; -[0D]
  const maxMemory = process.memoryUsage().heapTotal;


  res.json(200, {
    status: 'ok'
  });
});
/* GET home page. */
router.get('/_health/live', function (req, res, next) {
  res.json(200, {
    status: 'ok'
  });
});
/* GET home page. */
router.get('/_health/ready', function (req, res, next) {
  res.json(200, {
    status: 'ok'
  });
});

module.exports = router;
