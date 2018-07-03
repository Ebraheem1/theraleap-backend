var bcrypt = require('bcrypt');
var patientAdapter = require('../adapters/patientAdapter');
const jwt = require("jsonwebtoken");

let patientController = {
  login: function(req, res)
  {
    if(!req.body.email || !req.body.password) return res.status(400).send({message: "Complete Missing Fields"});
    var query = { email: req.body.email };
    patientAdapter.getPatient(query, function(err, patient)
    {
      if(err)
      {
        return res.status(400).send({success: false, message: 'Internal error'});
      }
      if(!patient)
      {
        return res.status(404).send({success: false, message: 'Email not found'});
      }
      bcrypt.compare(req.body.password, patient.password, function(err, result)
      {
        if(err)
        {
          return res.status(400).send({success: false, message: 'Internal error'});
        }
        if(result){
          //token code goes here
          var sessionUser = {
            email: patient.email,
            name: patient.name,
            id: patient._id,
            therapist_id: patient.therapist_id,
            TI_threshold: patient.TI_threshold,
            WA_thresholds: patient.WA_thresholds,
            WA_handType: patient.WA_handType,
            enabled_gesture: patient.enabled_gesture,
            type: '2'
          }
          const payload = { user: sessionUser};
          let token = jwt.sign(payload, process.env.APPSECRET, {
                  expiresIn: 60*60*24 // expires in 24 hours
                });
          return res.status(200).json({success: true, token: token, user: sessionUser});
        }
        else{
          return res.status(400).send({success: false, message: 'Invalid Password'});
        }
      })
    })
  },

}

module.exports = patientController;
