var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Statistics
var Statistic = new Schema({
  classifier_name: { //WristAngleClassifier OR ThumbIndexClassifier
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
  winning_flag: Boolean, // both classifiers
  scatter_WA: [Number], // for WA classifier
  scatter_TI: [Number], // for TI classifier
  histogram_TI: [mongoose.Schema.Types.Mixed],  //markModified('attributeName') before saving //for TI classifier
  max_time: Number, // for both classifiers
  max_angle_upwards: Number,  // for WA classifier
  max_angle_downwards: Number  // for WA classifier
},{
    collection: 'statistics'
});

module.exports = mongoose.model('Statistic', Statistic);
