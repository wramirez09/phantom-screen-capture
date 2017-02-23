var express = require('express')
var app = express();
var webshot = require('webshot');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


module.exports.postIndex = function(req, res) {
    console.log('postIndex')
}

module.exports.phantomscreencapture = function(req, res) {
    console.log("phantomscreencapture", req.query);

    var urly = req.query.url,
        userAgent = req.query.userAgent;

    options = {
        shotSize: {
            width: req.query.width ? req.query.width : 'all',
            height: req.query.height ? req.query.height : 'all'
        },
        userAgent: userAgent
    };

    var filename = urly.replace(/^https?\:\/\//i, "").replace(/\/$/, "");

    console.log('filename', filename);

    webshot(urly, 'public/images/screenshots/' + filename + '.jpeg', options, function(err) {
        // screenshot now saved to flickr.jpeg
        console.log("webshot called");
    });

    res.send(filename + '.jpeg');

}