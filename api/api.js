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

    var queryObj = req.query,
        urly = req.query.url,
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
            left: req.query.left,
            right: req.query.right,
            top: req.query.top,
            bottom: req.query.bottom
        },
        userAgent: userAgent,
        phantomConfig: {},
        cookies: [],
        customHeaders: null,
        defaultWhiteBackground: false,
        customCSS: req.query.css,
        quality: 100,
        siteType: "url",
        renderDelay: 1,
        timeout: 0,
        takeShotOnCallback: false

    };

    var filename;

    if (req.query.filename !== "") {

        filename = req.query.filename
        console.log(filename, "filename1");

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
        console.log("webshot called");
    });

    // RESPONDSE

    req.query.fileTypeExtension = fileTypeExtension;
    req.query.filename = filename
        // send the src of the image 

    res.status(200).send(req.query);

}