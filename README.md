# express-rest-response

An express.js middleware expanding your Response for REST API.

## Installation

```sh
$ npm install express-rest-response
```

## API

```js
var express = require('express');
var restResponse = require('express-rest-response');

var app = express();

app.use(restResponse(options));

app.get('/users', function (req, res, next) {
  ...
  res.rest.success(body);
});

```

### restResponse(options)

The options are:
- `showStatusCode` - If `true`, then added `status` parameter in the response body. (Default: false)
- `showDefaultMessage` - If `true`, then added `message` parameter in the response body. (Default: false)

## Methods

### success(body, statusCode)
  - `body` - body response or message (Default: empty)
  - `statusCode` - status code response (Default: 200)

### badRequest(body)
  - `body` - body response or message (Default: empty)

### forbidden(body)
  - `body` - body response or message (Default: empty)

### notFound(body)
  - `body` - body response or message (Default: empty)

### unauthorized(body)
  - `body` - body response or message (Default: empty)

### serverError(body)
  - `body` - body response or message (Default: empty)

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
  ...
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