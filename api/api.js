var express = require('express')
var app = express();
var webshot = require('webshot');



module.exports.postIndex = function(req, res) {
    console.log('postIndex')
}

module.exports.phantomscreencapture = function(req, res) {
    console.log("phantomscreencapture", req.query.url);
    var webshot = require('webshot');

    var options = {
        screenSize: {
            width: 320,
            height: 480
        },
        shotSize: {
            width: req.query.width,
            height: req.query.height
        },
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)' +
            ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
    };


    // add mechanism to strip out http for file and directpry name
    // convert to string if coming from a form
    webshot(req.query.url, req.query.url + '.jpeg', options, function(err) {
        // screenshot now saved to flickr.jpeg
        console.log("webshot called");
    });

}