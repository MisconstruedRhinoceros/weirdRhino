var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

require('./db/database');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require('./routes/routes')(app, express);

var port = process.env.PORT || 8080;


app.use(express.static(__dirname + '/../client/static'));
app.use(express.static(__dirname + '/../client/build'));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.listen(port);
console.log('listening on ' + port);

exports = module.exports = app;
