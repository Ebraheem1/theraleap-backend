var express = require('express');
const jwt = require("jsonwebtoken");
var app = express();
var statisticRoutes = express.Router();

var statisticController = require('../controllers/statisticController');

//Ensure Authentication Middleware
statisticRoutes.use(function(req, res, next) {
  let token =
        req.body.token || req.query.token || req.headers["x-access-token"];
  if(token) {
    jwt.verify(token, process.env.APPSECRET, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      }else if(decoded.user.type != '2')
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

statisticRoutes.post('/create', statisticController.create);

module.exports = statisticRoutes;
