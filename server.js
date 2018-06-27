var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config/DB');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database: '+ err)}
);
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());
//We need to add .env File
var port = process.env.PORT || 4000;
var server = app.listen(function(){
    console.log('Listening on port ' + port);
});