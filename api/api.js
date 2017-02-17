var express = require('express')
var app = express()


module.exports.post = function(req, res){
    console.log('hit', req.params.url);
    // res.send(req.params)

    // res.render("public/index.html");
} 
