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
        screenSize: {
            width: req.query.screenWidth,
            height: req.query.screenHeight
        },
        shotOffset: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        userAgent: userAgent,
        phantomConfig: {},
        cookies: [],
        customHeaders: null,
        defaultWhiteBackground: false,
        customCSS: "",
        quality: 75,
        siteType: "url",
        renderDelay: 0,
        timeout: 0,
        takeShotOnCallback: false

    };

    var filename;

    if (req.query.filename) {

        filename = req.query.filename
        console.log(filename, "filename");

    } else {

        filename = urly.replace(/^https?\:\/\//i, "").replace(/\/$/, "");
        console.log(filename, "filename");
    }

    var fileTypeExtension;

    if (req.query.fileTypeExtension) {
        fileTypeExtension = req.query.fileTypeExtension;
    } else {

        fileTypeExtension = "png"
    }

    var finalFileName = filename + "." + fileTypeExtension;
    console.log("finalFileName", finalFileName);

    webshot(urly, 'public/images/screenshots/' + finalFileName, options, function(err) {
        if (err) {
            console.log(err, "err")
        }

        // screenshot now saved to flickr.jpeg
        console.log("webshot called", req.query);
    });

    // send the src of the image 

    res.send(finalFileName);

}