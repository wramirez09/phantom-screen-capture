var express = require('express')
var app = express();
var phantom = require('phantom');


module.exports.postIndex = function(req, res) {
    console.log('postIndex')
}

module.exports.phantomscreencapture = function(req, res) {

    console.log("query", req.query);

    /* req.query is an object containing all url parameters */

    // var viewport = {
    //     width: req.query.width,
    //     height: req.query.height
    // };

    // var defaulted = 0;


    // // default
    // var clipRect = {
    //     top: defaulted,
    //     left: defaulted,
    //     width: viewport.width,
    //     height: viewport.height
    // };

    phantom.create().then(function(ph) {

        ph.createPage().then(function(page) {

            page.open(req.query.url);

            page.render(req.query.url + ".png");

            // ph.exit();
        })
    });
}