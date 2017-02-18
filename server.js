var express = require('express')
var app = express()
var api = require('./api/api')


app.use(express.static('public'))



// index page end point
app.get('/', function(req, res) {
    console.log("index page hit");
});

// end point
app.all("/phantom-capture/", function(req, res) {

    api.post.bind(this)
});

// app listen
app.listen(3100, function() {
    console.log('app listening on port 3100!')
})