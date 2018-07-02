var Statistic = require('../models/Statistic');

let statisticAdapter = {
    create: function(stat, cb) {
      var statistic = new Statistic(stat);
      statistic.save(cb);
    }
};
module.exports = statisticAdapter;
