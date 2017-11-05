var express = require('express')
var app = express();
var webshot = require('webshot');
var zipfiles = require('./zipfiles');
var crawler = require('./crawler');
var options = require('./options');
module.exports.singleshot = function(req, res) {


    console.log("taking a single screenshot", req.query);
    
    var urly = req.query.singleurl,
        userAgent = req.query.userAgent,
        filename,
        fileTypeExtension;

    if (req.query.filename !== "") {

        filename = req.query.filename

    } else {

        filename = urly.replace(/^https?\:\/\//i, "").replace(/\/$/, "");
    }

    if (req.query.fileTypeExtension) {

        fileTypeExtension = req.query.fileTypeExtension;
    } else {

        fileTypeExtension = "png"
    }

    // add back to req object 
    finalFileName = filename + "." + fileTypeExtension;
    req.query.fileTypeExtension = fileTypeExtension;
    req.query.filename = filename

    zipfiles.removefiles();

    zipfiles.removezip();

    if (req.query.crawler == "true") {
        // crawler
        crawler.crawl(req, res);

    } else {

        webshot(urly, './public/screenshots/' + finalFileName, options.options(req, res), function(err) {
            if (err) {
                console.log(err, "err")
            }

            console.log("webshot called");

            // send the modified req obj back
            res.status(200).send(req.query);
        });
    }

}