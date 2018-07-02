var Statistic = require('../models/Statistic');

let statisticAdapter = {
  getPatientStatistic: function(query, cb)
  {
    Statistic.find(query, cb);
  }
}

module.exports = statisticAdapter;
