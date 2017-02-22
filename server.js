var express = require('express');
var app = express();
var api = require('./api/api');

app.use(express.static('public'));

/* console.log on post only */

// phantom-capture end point
app.all("/phantom-capture/", api.phantomscreencapture.bind(this));

app.all("/", api.postIndex.bind(this));
// app listen
app.listen(3100, function(req, res) {
    console.log('app listening on port 3100!')
});