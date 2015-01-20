var express = require('express');
var app = express();

var restResponse = require('./index');

app.use(restResponse({
  showStatusCode: true,
  showDefaultMessage: true
}));

app.get('*', function (req, res, next) {
  res.rest.success();
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});