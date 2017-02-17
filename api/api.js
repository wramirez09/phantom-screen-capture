var express = require('express')
var app = express()


module.exports.post = function(req, res){
    console.log('hit', res.send('hit it'))

    res.render("index.html");
} 
