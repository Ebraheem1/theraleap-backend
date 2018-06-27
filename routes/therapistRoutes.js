var express = require('express');
var app = express();
var therapistRoutes = express.Router();

var Therapist = require('../models/Therapist');
var therapistAdapter = require('../adapters/therapistAdapter');

therapistRoutes.route('/add').get(function(req, res) {
    //render to add therapist page
})
therapistRoutes.route('/create').post(function(req, res){
    // if therapist session
    var body = req.body;
    therapistAdapter.createTherapist(body);
});

module.exports = therapistRoutes;
  
  