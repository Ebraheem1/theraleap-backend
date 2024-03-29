var statisticAdapter = require('../adapters/statisticAdapter');

let statisticController = {
  create: function(req, res)
  {
    var stat = req.body;
    statisticAdapter.create(stat, function(err) {
      if(err){
        return res.status(400).send({message: "unable to save"});
      }
      return res.status(200).json({success: true, message: 'Saved successfully'});
    });
  },

}

module.exports = statisticController;
