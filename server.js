// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  var date;
  var unix = parseInt(req.params.date);

  if(!req.params.date){
    let cur_unix = Date.now();
    date = new Date(cur_unix);
  } else if(isNaN(unix)) {
    date = new Date(req.params.date);
  } else {
    date = new Date(unix);    
  }

  if(isNaN(date)) {
    return res.json({error: 'Invalid Date'});
  }

  return res.json({unix: date.getTime(), utc: date.toUTCString()});
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
