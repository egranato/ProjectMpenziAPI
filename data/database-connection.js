require('dotenv').load();
const environment = process.env.NODE_ENV || 'development';
module.exports = require('knex')(require('../knexfile')[environment]);
