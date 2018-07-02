var express = require('express');
var app = express();
var StatisticRoutes = express.Router();

var statisticController = require('../controllers/statisticController');

StatisticRoutes.post('/create', statisticController.create);

module.exports = StatisticRoutes;
