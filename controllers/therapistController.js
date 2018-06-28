var bcrypt = require('bcrypt');
var therapistAdapter = require('../adapters/therapistAdapter');
const jwt = require("jsonwebtoken");

let therapistController = {
  createTherapist: function(req, res) {
    var body = req.body;
    //checks
    bcrypt.hash(body.password, parseInt(process.env.SALT), function(err, hash) {
      therapist = { name: body.name, email: body.email, password: hash };
      therapistAdapter.createTherapist(therapist, function(err) {
        // if(err) return res.status(400).json({'message':'Unable to save to database'});
        if(err){
          console.log(err);
          res.status(400).send("unable to save");
        }
        res.status(200).json({'message': 'Saved successfully'});
      });
    });
  },

  login: function(req, res) {
    var query = { email: req.body.email };
    therapistAdapter.getTherapist(query, function(err, therapist)
    {
      if(err)
      {
        res.status(400).send({success: false, message: 'Internal error'});
      }
      if(!therapist)
      {
        res.status(404).send({success: false, message: 'Email not found'});
      }
      bcrypt.compare(req.body.password, therapist.password, function(err, result)
      {
        if(err)
        {
          res.status(400).send({success: false, message: 'Internal error'});
        }
        if(result){
          //token code goes here
          delete therapist.password;
          const payload = { user: therapist, type: '1'};
          let token = jwt.sign(payload, process.env.APPSECRET, {
                  expiresIn: 60*60*24 // expires in 24 hours
                });
          res.status(200).json({success: true, token: token});
        }
        else{
          res.status(400).json({success: false, message: 'Invalid Password'});
        }
      })
    })
  },

  createPatient: function(req, res) {
    var body = req.body;
    if(body.name && body.email && body.password) {
      bcrypt.hash(body.password, parseInt(process.env.SALT), function(err, hash) {
        patient = { name: body.name, email: body.email, password: hash };
        therapistAdapter.createPatient(patient, function(err) {
          // if(err) return res.status(400).json({'message':'Unable to save to database'});
          if(err) return res.status(400).send("unable to save");
          res.status(200).json({'message': 'Saved successfully'});
        });
      });
    }
  }
};

module.exports = therapistController;






































//