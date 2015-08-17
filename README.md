# express-rest-response

An express.js (4.x) middleware expands your Response for REST API.

## Installation

```sh
$ npm install express-rest-response
```

## Usage

```js
var express = require('express');
var restResponse = require('express-rest-response');

var app = express();

var options = {
  showStatusCode: true,  
  showDefaultMessage: true  
};

app.use(restResponse(options));

app.get('/users/:id', function (req, res, next) {
  // ...
  var user = {
    name: 'Username'
  };

  res.rest.success(user);
});
```

#### restResponse(options)

Options:
- showStatusCode: (boolean) If `true`, then it adds `status` in body of response. (Default: `false`)
- showDefaultMessage: (boolean) If `true`, then it adds `message` in body of response. (Default: `false`)

## Methods

- success
- badRequest
- forbidden
- notFound
- notAcceptable
- unauthorized
- locked
- serverError
- serviceUnavailable

All methods receive 2 params:
- body (object|string) 
- statusCode (number) optional

## Examples

### success(body, statusCode)

```js
app.get('/users', function (req, res, next) {
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
```

Response status: `200`

Response body:

```json
{
  "users":[
    {
      "id": 1,
      "first_name": "Steve",
      "last_name": "Jobs"
    },
    {
    "id": 2,
    "first_name": "Mark",
    "last_name": "Zuckerberg"
    }
  ]
}
```

### badRequest(body)

```js
app.post('/login', function (req, res, next) {
  // ...
  res.rest.badRequest('Invalid email');
});
```

Response status: `400`

Response body:

```json
{
  "message": "Invalid email"
}
```

### forbidden(body)

```js
app.post('/admin', function (req, res, next) {
  ...
  res.rest.forbidden();
});
```

Response status: `403`

Response body:

```json
{}
```

If options `showDefaultMessage` true

```json
{
  "message": "Forbidden"
}
```

### notFound(body)

```js
app.get('/posts/:id', function (req, res, next) {
  ...
  res.rest.notFound('Post not found');
});
```

Response status: `404`

Response body:

```json
{
  "message": "Post not found"
}
```

### unauthorized(body)

```js
app.get('/friends', function (req, res, next) {
  ...
  res.rest.unauthorized('You must login');
});
```

Response status: `401`

Response body:

```json
{
  "message": "You must login"
}
```

### serverError(body)

```js
app.get('/', function (req, res, next) {
  res.rest.serverError();
});
```

Response status: `500`

Response body:

```json
{}
```

If options `showDefaultMessage` and/or `showStatusCode` true

```json
{
  "message": "Internal Server Error",
  "status": 500
}
```
