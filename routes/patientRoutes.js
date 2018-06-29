var express = require('express');
var app = express();
var patientRoutes = express.Router();

var patientController = require('../controllers/patientController');

patientRoutes.post('/login', patientController.login);

module.exports = patientRoutes;
