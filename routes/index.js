const express = require('express');
const queries = require('../data/queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').load();

const createToken = (user) => {
  const data = {
    user: {
      id: user.id,
      username: user.username,
      admin: user.admin
    },
    key: process.env.SECRET_STRING_B
  };
  const token = jwt.sign({
    data
  }, process.env.SECRET_STRING_A, { expiresIn: '78h' });
  return token;
};

router.post('/', (req, res, next) => {
  queries.checkAdmin()
    .then((results) => {
      if (results.length < 2) {
        bcrypt.hash(req.body.digest, Number(process.env.SALT_ROUNDS), (err, hash) => {
          if (err) throw err;
          const user = {
            username: req.body.username,
            digest: hash
          };
          queries.addAdmin(user)
            .then((result) => {
              res.json(result);
            }).catch((error) => {
              throw error;
            });
        });
      } else {
        res.sendStatus(400);
      }
    }).catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  queries.getUser(req.body.username)
    .then((result) => {
      if (result) {
        console.log(result);
        bcrypt.compare(req.body.digest, result.digest, (err, response) => {
          if (err) throw err;
          if (response) {
            result.admin = true;
            const token = createToken(result);
            res.json({ token });
          } else {
            res.sendStatus(401);
          }
        });
      } else {
        res.sendStatus(400);
      }
    }).catch((error) => {
      res.sendStatus(500);
      console.error(error);
    });
});

module.exports = router;
