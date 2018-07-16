var express = require('express');
var app = express();
var therapistRoutes = express.Router();

var therapistController = require('../controllers/therapistController');

const jwt = require("jsonwebtoken");

therapistRoutes.post('/login', therapistController.login);

//Ensure Authentication Middleware
therapistRoutes.use(function(req, res, next) {
  let token =
        req.body.token || req.query.token || req.headers["x-access-token"];
  if(token) {
    jwt.verify(token, process.env.APPSECRET, function(err, decoded) {
      if (err) {
        if(err.message == 'jwt expired')
        {
          return res.status(401).send({
            message: 'jwt expired'
          });
        }
        return res.status(400).send({
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
therapistRoutes.get('/view-patients', therapistController.viewPatients);
therapistRoutes.post('/edit-patient', therapistController.savePatientInfo);
therapistRoutes.get('/get-statistics/:id/:enabled_gesture', therapistController.getPatientStatistics);
therapistRoutes.get('/patient-info/:id', therapistController.getPatientInfo);

module.exports = therapistRoutes;
