var express = require('express')
var app = express()
var api = require('./api/api')

app.use(express.static('public'))


app.get('/', function (req, res) {
  // res.send('Hello World!')
  console.log("index page hit");
})


app.all("/phantom-capture/", api.post);

app.listen(3100, function () {
  console.log('Example app listening on port 3000!')
})