var express = require('express')
var app = express();
var webshot = require('webshot');
var zipfiles = require('./zipfiles');
var crawler = require('./crawler');
module.exports.singleshot = function(req, res) {


    console.log("taking a single screenshot", req.query);


    var queryObj = req.query,
        urly = req.query.singleurl,
        userAgent = req.query.userAgent;


    options = {
        shotSize: {
            width: req.query.width ? req.query.width : 'all',
            height: req.query.height ? req.query.height : 'all'
        },
        screenSize: {
            width: req.query.screenwidth > 0 ? req.query.screenwidth : req.query.screenWidth,
            height: req.query.screenheight > 0 ? req.query.screenheight : req.query.screenHeight
        },
        shotOffset: {
            left: req.query.left,
            right: req.query.right,
            top: req.query.top,
            bottom: req.query.bottom
        },
        userAgent: userAgent,
        phantomConfig: { 'ignore-ssl-errors': 'true' },
        cookies: [{
                name: req.query.cookie1Name,
                value: req.query.cookie1Value,
                path: req.query.cookie1Path,
                domain: req.query.cookie1Domain
            },
            {
                name: req.query.cookie2Name,
                value: req.query.cookie2Value,
                path: req.query.cookie2Path,
                domain: req.query.cookie2Domain
            }
        ],
        customHeaders: null,
        defaultWhiteBackground: false,
        customCSS: req.query.css,
        quality: 75,
        siteType: "url",
        renderDelay: 3,
        timeout: 0,
        takeShotOnCallback: false

    };

    var filename;

    if (req.query.filename !== "") {

        filename = req.query.filename


    } else {

        filename = urly.replace(/^https?\:\/\//i, "").replace(/\/$/, "");
    }

    var fileTypeExtension;

    if (req.query.fileTypeExtension) {

        fileTypeExtension = req.query.fileTypeExtension;
    } else {

        fileTypeExtension = "png"
    }

    var finalFileName = filename + "." + fileTypeExtension;

    req.query.fileTypeExtension = fileTypeExtension;
    req.query.filename = filename

    /* remove old screenshots from directory  */
    zipfiles.removefiles();

    /* remove zip file  */
    zipfiles.removezip();

    if (req.query.crawler == "true") {
        // crawler - TESTING
        crawler.crawl(req, res);

    } else {

        webshot(urly, 'public/screenshots/' + finalFileName, options, function(err) {
            if (err) {
                console.log(err, "err")
            }

            console.log("webshot called", req.query);
            // send the req obj back
            res.status(200).send(req.query);
        });
    }


}