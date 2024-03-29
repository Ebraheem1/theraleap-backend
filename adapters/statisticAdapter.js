var Statistic = require('../models/Statistic');

let statisticAdapter = {
    create: function(stat, cb) {
      var statistic = new Statistic(stat);
      statistic.save(cb);
    },
    getPatientStatistic: function(query, cb)
    {
      Statistic.find(query, null, {sort: {createdAt: -1}}, cb);
    }
};

module.exports = statisticAdapter;
