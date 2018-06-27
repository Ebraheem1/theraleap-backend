var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Statistics
var Statistic = new Schema({
  classifier_name: {
    type: String,
    required: true
  },
  patient_id:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Patient'
  },
  therapist_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Therapist'
  },
  scatter_WA: [Number],
  scatter_TI: [Number],
  histogram_TI: [mongoose.Schema.Types.Mixed],  //markModified('attributeName') before saving
  max_time: Number,
  max_angle_upwards: Number,  // for WA classifier
  max_angle_downwards: Number  // for WA classifier
},{
    collection: 'statistics'
});

module.exports = mongoose.model('Statistic', Statistic);