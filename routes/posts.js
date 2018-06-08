const express = require('express');
const router = express.Router();
const queries = require('../data/queries');

require('dotenv').load();

router.get('/', (req, res, next) => {
  queries.getFeed()
    .then((results) => {
      results = results.reverse();
      res.json({ results });
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

router.get('/:id', (req, res, next) => {
  queries.getPost(req.params.id)
    .then((result) => {
      res.json(result);
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    })
});

module.exports = router;
