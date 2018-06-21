const express = require('express');
const queries = require('../data/queries');
const jwt = require('jsonwebtoken');
const azure = require('azure-storage');
const router = express.Router();
require('dotenv').load();

router.use((req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET_STRING_A, function (err, decoded) {
      if (err) throw err;
      if (decoded.data.key === process.env.SECRET_STRING_B) {
        req.user = decoded.data.user;
        if (decoded.data.user.admin) {
          next();
        } else {
          throw 'Not Admin';
        }
      } else {
        throw 'Invalid Key';
      }
    });
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
});

router.post('/post', (req, res, next) => {
  queries.checkPlace(req.body.post.place)
    .then((response) => {
      let post = {
        title: req.body.post.title,
        body: req.body.post.body,
        image: req.body.post.image,
        place_id: null
      };
      if (response) {
        post.place_id = response.id;
        queries.newPost(post)
          .then((result) => {
            res.json(result[0]);
          }).catch((err) => {
            throw err;
          })
      } else {
        queries.newPlace(req.body.post.place)
          .then((results) => {
            post.place_id = results[0];
            queries.newPost(post)
              .then((result) => {
                res.json(result[0]);
              }).catch((err) => {
                throw err;
              })
          }).catch((error) => {
            throw error
          });
      }
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    })
});

router.post('/author', (req, res, next) => {
  console.log(req.body);
  queries.updateAuthor(req.body.author)
    .then((response) => {
      res.json(response);
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

module.exports = router;