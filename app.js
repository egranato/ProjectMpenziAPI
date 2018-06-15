const express = require('express');
const path = require('path');
const logger = require('morgan');

const postsRouter = require('./routes/posts');
const placesRouter = require('./routes/places');
const authorRouter = require('./routes/users');
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
    const origin = req.headers['origin'];
    res.send({ origin });
    // if (origin.indexOf('lo') !== -1) {
    //     res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    // } else {
    //     res.header('Access-Control-Allow-Origin', origin);
    // }
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    // res.header('Access-Control-Allow-Credentials', 'true');
    // if (req.method === 'OPTIONS') {
    //     res.sendStatus(200);
    // } else {
    //     next();
    // }
});

// public routes
app.use('/api', indexRouter);
app.use('/api/posts', postsRouter);
app.use('/api/places', placesRouter);
app.use('/api/author', authorRouter);
// protected routes
app.use('/api/admin', adminRouter);

module.exports = app;
