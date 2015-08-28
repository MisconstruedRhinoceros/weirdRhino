var express = require('express');
var bodyParser = ('body-parser');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.static(_dirname + '../client/static'));

app.listen(port);

exports = module.exports = app;