// server.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

app.get('/api/timestamp/:date_string?', function (req, res) {
  var dateString = req.params.date_string
  // Matchs for only numbers
  var unixRegex = /^\d+$/

  // Checks if date string is unix and converts it to number
  if (unixRegex.test(dateString)) {
    dateString = Number(dateString)
  }

  // Checks if dateString is not empty and returns the informed date, otherwise, returns the current date.
  var date = dateString ? new Date(dateString) : new Date()

  var unix = date.getTime()

  // Verifies if unix is not null. When it is null, the informed date is not valid.
  if (unix) {
    res.json({ 'unix': date.getTime(), 'utc': date.toUTCString() })
  } else {
    res.json({ 'error': 'Invalid Date' })
  }
})
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
