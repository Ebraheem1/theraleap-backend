var express = require('express');
var app = express();
var therapistRoutes = express.Router();

var therapistController = require('../controllers/therapistController');

const jwt = require("jsonwebtoken");
// var bcrypt = require('bcrypt');

therapistRoutes.post('/login', therapistController.login);

//Ensure Authentication Middleware
therapistRoutes.use(function(req, res, next) {
  let token =
        req.body.token || req.query.token || req.headers["x-access-token"];
  if(token) {
    jwt.verify(token, process.env.APPSECRET, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      }else if(decoded.user.type != '1')
      {
        return res.status(401).send({
          success: false,
          message: 'UnAuthorized Access'
        });
      }
      else {
        req.userId = decoded.user.id;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

therapistRoutes.post('/create', therapistController.createTherapist);
therapistRoutes.post('/create_patient', therapistController.createPatient);

// therapistRoutes.route('/create_patient').post(function(req, res) {
//     // if therapist session
//     // checks
//     var body = req.body;
//     bcrypt.hash(body.password, parseInt(process.env.SALT), function(err, hash) {
//       patient = { name: body.name, email: body.email, password: hash };
//       therapistAdapter.createPatient(patient, function(err) {
//         // if(err) return res.status(400).json({'message':'Unable to save to database'});
//         if(err) return res.status(400).send("unable to save");
//         res.status(200).json({'message': 'Saved successfully'});
//       });
//     });
// });


module.exports = therapistRoutes;
