var express = require('express');
var app = express();
var therapistRoutes = express.Router();

var Therapist = require('../models/Therapist');
var therapistAdapter = require('../adapters/therapistAdapter');

var bcrypt = require('bcrypt');

therapistRoutes.route('/add').get(function(req, res) {
    //render to add therapist page
    console.log("add routes");
});

therapistRoutes.route('/create').post(function(req, res) {
    // if therapist session
    // checks
    var body = req.body;
    bcrypt.hash(body.password, parseInt(process.env.SALT), function(err, hash) {
      therapist = { name: body.name, email: body.email, password: hash };
      therapistAdapter.createTherapist(therapist, function(err) {
        // if(err) return res.status(400).json({'message':'Unable to save to database'});
        if(err) return res.status(400).send("unable to save");
        res.status(200).json({'message': 'Saved successfully'});
      });
    });
});

therapistRoutes.route('/create_patient').post(function(req, res) {
    // if therapist session
    // checks
    var body = req.body;
    bcrypt.hash(body.password, parseInt(process.env.SALT), function(err, hash) {
      patient = { name: body.name, email: body.email, password: hash };
      therapistAdapter.createPatient(patient, function(err) {
        // if(err) return res.status(400).json({'message':'Unable to save to database'});
        if(err) return res.status(400).send("unable to save");
        res.status(200).json({'message': 'Saved successfully'});
      });
    });
});

module.exports = therapistRoutes;
