var Patient = require('../models/Patient');

let patientAdapter = {
  getPatient: function(query, cb)
  {
    Patient.findOne(query, cb);
  },
  getPatients: function(query, cb)
  {
    Patient.find(query, cb);
  },
  updatePatient: function(query, updates, condition, cb)
  {
    if(query.id !== undefined)
    {
      Patient.findByIdAndUpdate(query.id, updates, condition, cb);
    }
  }
}

module.exports = patientAdapter;
