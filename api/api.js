var express = require('express')
var app = express();
var phantom = require('phantom');


module.exports.post = function(req, res) {

    console.log("query", req.query)
        /* req.query is an object containing all url parameters */


    var viewport = {
        width: req.query.width,
        height: req.query.height
    };

    var clipRect = {
        top: 0,
        left: 0,
        width: viewport.width,
        height: viewport.height
    };


    phantom.create().then(function(ph) {

        ph.createPage().then(function(page) {

            // page.viewportSize = viewport;

            // page.clipRect = clipRect;

            page.open(req.query.url);

            page.render("screenshots/screenshot2.png");

            ph.exit();
        });
    });


}