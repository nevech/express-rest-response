var express = require('express');
var app = express();

var restResponse = require('../index');

app.use(restResponse({
  showStatusCode: true,
  showDefaultMessage: true
}));

app.get('/', function (req, res, next) {
  var body = {
    users: [
      {
        id: 1,
        first_name: 'Steve',
        last_name: 'Jobs'
      },
      {
        id: 2,
        first_name: 'Mark',
        last_name: 'Zuckerberg'
      }
    ]
  };

  res.rest.success(body);
});

app.get('/users/:id', function (req, res, next) {
  res.rest.notFound();
});

app.post('/login', function (req, res, next) {
  res.rest.badRequest();
});

app.get('/posts/:id', function (req, res, next) {
  res.rest.notFound();
});

app.get('/friends', function (req, res, next) {
  res.rest.unauthorized();
});

app.post('/users', function (req, res, next) {
  res.serverError();
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});