// server.js

const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      mongoose = require('mongoose'),
      config = require('./config/DB'),
      therapistRoutes = require('./routes/therapistRoutes'),
      statisticRoutes = require('./routes/statisticRoutes'),
      patientRoutes = require('./routes/patientRoutes'),
      expressValidator = require('express-validator');


mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
  );

require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
//express-validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));
app.use('/therapist', therapistRoutes);
app.use('/patient', patientRoutes);
app.use('/statistic', statisticRoutes);



const port = process.env.PORT || 4000;

 const server = app.listen(port, function(){
   console.log('Listening on port ' + port);
 });


 // server.js
