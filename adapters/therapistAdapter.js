var Therapist = require('../models/Therapist');
var Patient = require('../models/Patient');

let therapistAdapter = {

    createTherapist: function(therapist, cb) {
      var therapist = new Therapist(therapist);
      therapist.save(cb);
    },
    createPatient: function(patient, cb) {
      var patient = new Patient(patient);
      patient.save(cb);
    },
    forgetPassword: function(query, password) {

    },
    updateData: function(query, updates) {

    }
};
module.exports = therapistAdapter;
