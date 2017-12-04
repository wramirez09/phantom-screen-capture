var express = require('express');
var app = express();
var api = require('./api/api');

app.use(express.static('public'));

app.all("/phantom-capture/", api.phantomscreencapture.bind(this));

app.post("/", api.postIndex.bind(this));



// app.listen(3069, function(req, res) {
//     console.log('app listening on port 3069!')
// });