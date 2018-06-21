const express = require('express');
const queries = require('../data/queries');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  queries.getAuthorInfo()
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        queries.initializeAuthor()
          .then((result) => {
            res.json(result[0]);
          }).catch((error) => {
            throw error;
          });
      }
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

module.exports = router;
