var express = require('express')
var app = express();
var webshot = require('webshot');
var zipfiles = require('./zipfiles');
var crawler = require('./crawler');
var options = require('./options');
module.exports.singleshot = function(req, res) {


    console.log("taking a single screenshot", req.query);
    var queryObj = req.query,
        urly = req.query.singleurl,
        userAgent = req.query.userAgent;

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

        webshot(urly, 'public/screenshots/' + finalFileName, options.options(req, res), function(err) {
            if (err) {
                console.log(err, "err")
            }

            console.log("webshot called", req.query);
            // send the req obj back
            res.status(200).send(req.query);
        });
    }

}