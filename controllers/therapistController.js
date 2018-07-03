var bcrypt = require('bcrypt');
var therapistAdapter = require('../adapters/therapistAdapter');
var patientAdapter = require('../adapters/patientAdapter');
var statisticAdapter = require('../adapters/statisticAdapter');

const jwt = require("jsonwebtoken");

let therapistController = {
  createTherapist: function(req, res) {
    var body = req.body;

    if(!body.name) return res.status(400).send({message: "Name is required"});
    if(!body.email) return res.status(400).send({message: "Email is required"});
    if(!body.password) return res.status(400).send({message: "Password is required"});
    req.checkBody('email','Email is in wrong format').isEmail();
    req.checkBody('password', 'Password at least 3 characters and at most 8').len(3, 8);
    var errors = req.validationErrors();
    if(errors)
    {
      return res.status(400).send({success: false, errors: errors});
    }
    var query = { email: body.email };
    therapistAdapter.getTherapist(query, function(err, therapist) {
      if(err) return res.status(400).send({message: "Internal Error"});
      if(therapist) return res.status(400).send({message: "Email is already registered"});

      bcrypt.hash(body.password, parseInt(process.env.SALT), function(err, hash) {
        therapist = { name: body.name, email: body.email, password: hash };
        therapistAdapter.createTherapist(therapist, function(err) {
          if(err) {
            return res.status(400).send({message: "Unable to save to database"});
          }
          res.status(200).json({message: 'Saved successfully'});
        });
      });
    })


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
          var sessionUser = {
            email: therapist.email,
            name: therapist.name,
            id: therapist._id,
            type: '1'
          }
          const payload = { user: sessionUser};
          let token = jwt.sign(payload, process.env.APPSECRET, {
                  expiresIn: 60*60*24 // expires in 24 hours
                });
          res.status(200).json({success: true, token: token, user: sessionUser});
        }
        else{
          res.status(400).send({success: false, message: 'Invalid Password'});
        }
      })
    })
  },
  createPatient: function(req, res) {
    //add therapist_id
    var body = req.body;
    if(body.name && body.email && body.password) {
      console.log(body);
      req.checkBody('email',' Email is in wrong format').isEmail();
      var errors = req.validationErrors();
      if(errors)
      {
        res.status(400).send({success: false, errors: errors})
      }
      bcrypt.hash(body.password, parseInt(process.env.SALT), function(err, hash) {
        patient = { name: body.name, email: body.email, password: hash, therapist_id: req.userId };
        therapistAdapter.createPatient(patient, function(err) {
          if(err) return res.status(400).send("unable to save");
          res.status(200).json({'message': 'Saved successfully'});
        });
      });
    }
  },
  viewPatients: function(req, res)
  {
    patientAdapter.getPatients({ therapist_id: req.userId}, function(err, patients)
    {
      if(err)
      {
        res.status(400).send({success: false, message: "Internal Error"});
      }
      let resPatients = [];
      if(patients.length > 0)
      {
        for(var i = 0; i < patients.length; i++)
        {
          resPatients[i] = {
            id: patients[i]._id,
            name: patients[i].name,
            enabled_gesture: patients[i].enabled_gesture,
            therapist_id: patients[i].therapist_id,
            TI_threshold: patients[i].TI_threshold,
            WA_thresholds: patients[i].WA_thresholds,
            WA_handType: patients[i].WA_handType,
            email: patients[i].email,
            WA_difficulty: patients[i].WA_difficulty
          };
        }
      }
      res.status(200).json({ success: true, patients: resPatients});
    });
  },
  savePatientInfo: function(req, res)
  {
    var updates = req.body;
    var query = {id: req.body.id};
    updates.id = undefined;
    patientAdapter.updatePatient(query, updates, {new:true}, function(err, patient)
    {
      if(err)
      {
        res.status(400).send({success: false, message: "Internal Error"});
      }
      res.status(200).json({success: true, patient: patient});
    });
  },
  getPatientStatistics: function(req, res)
  {
    console.log(req.params);
    if(req.params.id && req.params.enabled_gesture)
    {
      var query = {patient_id: req.params.id, classifier_name: req.params.enabled_gesture};
      statisticAdapter.getPatientStatistic(query, function(err, data)
      {
        if(err)
        {
          res.status(400).send({success: false, message: "Internal Error"});
        }

        res.status(200).json({success: true, graphs: data});
      })
    }
  },
  getPatientInfo: function(req, res)
  {
    var query = { _id: req.params.id };
    patientAdapter.getPatient(query, function(err, patient)
    {
      if(err)
      {
        return res.status(400).send({message: "Internal Error"});
      }
      if(! patient)
      {
        return res.status(404).send({message: "Invalid Patient"});
      }
      else{
        return res.status(200).json({success: true, patient: patient})
      }
    })
  }
};

module.exports = therapistController;






































//
