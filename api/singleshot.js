var express = require('express')
var app = express();
// var webshot = require('webshot');
const puppeteer = require('puppeteer');
var zipfiles = require('./zipfiles');
var crawler = require('./crawler');
var options = require('./options');
module.exports.singleshot = function(req, res) {
    
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

        (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(urly);
            await page.screenshot({path: "./public/ss/" + finalFileName, fullPage: true });
            await res.status(200).send(req.query);
            await browser.close();
          })();
    }

}