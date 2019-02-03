var express = require('express')
var app = express();
var singleshot = require('./singleshot');
var multishot = require('./multishot');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


module.exports.postIndex = function(req, res) {
    console.log('postIndex')
    res.send({"test":"test"});
}

module.exports.phantomscreencapture = function(req, res) {

    if (req.query.multipleshot == 'false') {

        singleshot.singleshot(req, res);

    } else if (req.query.multipleshot == 'true') {

        multishot.multishot(req, res);

    }
}