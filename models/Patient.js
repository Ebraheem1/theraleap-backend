var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Patients
var Patient = new Schema({
  name: {
    type: String,
    required: true
  },
  email:{
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  therapist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Therapist'
  },
  TI_threshold: Number,
  WA_thresholds: [Number],
  WA_handType: String,
  enabled_gesture: String
},{
    collection: 'patients'
});

module.exports = mongoose.model('Patient', Patient);
