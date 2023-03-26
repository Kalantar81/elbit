const express = require('express');
const Router = express.Router();

const API_PREFIX = '/api';

Router.use(API_PREFIX + '/test', require('./test'));
Router.use(API_PREFIX + '/user', require('./user'));

module.exports = Router;
