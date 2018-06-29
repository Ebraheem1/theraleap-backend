var Patient = require('../models/Patient');

let patientAdapter = {
  getPatient: function(query, cb)
  {
    Patient.findOne(query, cb);
  }
}

module.exports = patientAdapter;
