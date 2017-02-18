var express = require('express')
var app = express();
var phantom = require('phantom');


module.exports.post = function(req, res) {



    console.log("query", req.query)
    res.redirect('/');


}