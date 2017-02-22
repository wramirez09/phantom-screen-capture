var express = require('express');
var app = express();
var api = require('./api/api');



function callback(req, res) {
    console.log("index page hit");
};


app.use(express.static('public'));

// index page end point
app.all('/', callback);

// phantom-capture end point
app.all("/phantom-capture/", api.post.bind(this));

// app listen
app.listen(3100, function() {
    console.log('app listening on port 3100!')
});