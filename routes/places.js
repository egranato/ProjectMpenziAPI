const express = require('express');
const router = express.Router();
const queries = require('../data/queries');

router.get('/', (req, res, next) => {
  queries.getPlaces()
    .then((results) => {
      for (let i = 0; i < results.length; ++i) {
        const temp = results[i];
        let j = i - 1;
        while (j >= 0 && results[j].name > temp.name) {
          results[j + 1] = results[j];
          --j;
        }
        results[j + 1] = temp;
      }
      res.json({ results });
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

router.get('/:id', (req, res, next) => {
  queries.getPlacePosts(req.params.id)
    .then((results) => {
      res.json({ results });
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    })
});

module.exports = router;
