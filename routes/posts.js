const express = require('express');
const router = express.Router();
const queries = require('../data/queries');

require('dotenv').load();

const checkSQL = (string) => {
  string = string.toLowerCase();
  const check1 = string.indexOf('select') > -1;
  const check2 = string.indexOf('from') > -1;
  const check3 = string.indexOf('drop') > -1;
  const check4 = string.indexOf('table') > -1;
  if (check1 && check2) {
    console.error('SQL found, check 1 or 2', check1, check2);
    return false;
  } else {
    if (check3 && check4) {
      console.error('SQL found, check 3 or 4', check3, check4);
      return false;
    } else {
      return true;
    }
  }
}

const checkPost = (post) => {
  if (!post.title || post.title.length === 0 || !checkSQL(post.title)) {
    console.error('fails at check 1');
    return false;
  }
  if (!post.body || post.title.body === 0 || !checkSQL(post.body)) {
    console.error('fails at check 2');
    return false;
  }
  if (post.image && !checkSQL(post.image)) {
    console.error('fails at check 3');
    return false;
  }
  if (post.place && !checkSQL(post.place)) {
    console.error('fails at check 4');
    return false;
  }
  return true;
}

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

router.get('/dates', (req, res, next) => {
  queries.getDates()
    .then((data) => {
      const dates = [];
      const results = [];
      data.forEach((result) => {
        const date = result.created_at.toDateString();
        if (dates.indexOf(date) === -1) {
          dates.push(date);
        }
      });
      dates.forEach((date) => {
        const dateObj = {
          posts: [],
          date
        }
        data.forEach((result) => {
          if (result.created_at.toDateString() === date) {
            dateObj.posts.push(result.id);
          }
        });
        results.push(dateObj);
      });
      for (let i = 0; i < results.length; ++i) {
        const temp = results[i];
        let j = i - 1;
        while (j >= 0 && new Date(results[j].date) < new Date(temp.date)) {
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

router.get('/dateposts', (req, res, next) => {
  queries.getFeed()
    .then((data) => {
      const results = [];
      data.forEach((post) => {
        if (post.date.toDateString() === req.query.datestring) {
          results.push(post);
        }
      });
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
    });
});

router.post('/', (req, res, next) => {
  const ogPost = req.body;
  if (checkPost(ogPost)) {
    queries.checkPlace(ogPost.place)
      .then((result) => {
        if (result) {
          const post = {
            title: ogPost.title,
            body: ogPost.body,
            place_id: result.id
          };
          if (ogPost.image) {
            post.image = ogPost.image;
          }
          queries.newPost(post)
            .then((result) => {
              res.json({ result: result[0] });
            }).catch((error) => {
              res.sendStatus(500);
              console.error(error);
            });
        } else {
          queries.newPlace(ogPost.place)
            .then((result) => {
              const post = {
                title: ogPost.title,
                body: ogPost.body,
                place_id: result.id
              };
              if (ogPost.image) {
                post.image = ogPost.image;
              }
              queries.newPost(post)
                .then((result) => {
                  res.json({ result: result[0] });
                }).catch((error) => {
                  res.sendStatus(500);
                  console.error(error);
                });
            }).catch((error) => {
              throw error;
            });
        }
      }).catch((error) => {
        res.sendStatus(500);
        console.error(error);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
