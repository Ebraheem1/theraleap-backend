var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Therapists
var Therapist = new Schema({
  name: {
    type: String,
    required:  true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
},{
    collection: 'therapists'
});

module.exports = mongoose.model('Therapist', Therapist);
