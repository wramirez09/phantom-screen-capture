var express = require('express');
var app = express();
var api = require('./api/api');

app.use(express.static('public'));

/**
 * @param {end point} the endooint that process the screen shot
 
 */

app.all("/phantom-capture/", api.phantomscreencapture.bind(this));

/**
 * @param {index point} does nothing.
 */

app.all("/", api.postIndex.bind(this));



app.listen(9000, function(req, res) {
    console.log('app listening on port 9000!')
});