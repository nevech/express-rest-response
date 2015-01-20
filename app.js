var express = require('express');
var app = express();

var restResponse = require('./index');

app.use(restResponse({
  body: {
    statusCode: true,
    showDafultMessage: true
  }
}));

app.get('*', function (req, res, next) {
  res.rest.badRequest();
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});