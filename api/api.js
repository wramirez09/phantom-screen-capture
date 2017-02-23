var express = require('express')
var app = express();
var webshot = require('webshot');



module.exports.postIndex = function(req, res) {
    console.log('postIndex')
}

module.exports.phantomscreencapture = function(req, res) {
    console.log("phantomscreencapture");
    webshot('google.com', 'google.png', function(err) {
        console.log('web shot called')
            // screenshot now saved to google.png
    });

}