const express = require('express');
const path = require('path');
const logger = require('morgan');

const postsRouter = require('./routes/posts');
const placesRouter = require('./routes/places');
const authorRouter = require('./routes/users');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// public routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/api/posts', postsRouter);
app.use('/api/places', placesRouter);
app.use('/api/author', authorRouter);
// protected routes

module.exports = app;
