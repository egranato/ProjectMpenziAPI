const express = require('express');
const queries = require('../data/queries');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  queries.getAuthorInfo()
    .then((result) => {
      res.json(result);
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

module.exports = router;
