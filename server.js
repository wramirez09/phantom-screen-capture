var express = require('express');
var app = express();
var api = require('./api/api');

app.use(express.static('public'));

app.all("/phantom-capture/", api.phantomscreencapture.bind(this));

app.post("/", api.postIndex.bind(this));

var port = process.env.PORT || 3069;

app.listen(port, function(req, res) {
    console.log('app listening on port' + port);
});