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

### Methods of `res.rest`

All methods receive option `body`, type: `object` or `string`.

### 1xx: Informational

#### continue(body)
Status code: `100`

#### switchingProtocols(body)
Status code: `101`

#### processing(body)
Status code: `102`

### 2xx: Success

#### success(body)
Status code: `200`

#### created(body)
Status code: `201`

#### accepted(body)
Status code: `202`

#### nonAuthInfo(body)
Status code: `203`

#### noContent(body)
Status code: `204`

#### resetContent(body)
Status code: `205`

#### partialContent(body)
Status code: `206`

### 4xx: Client Error

#### badRequest(body)
Status code: `400`

#### unauthorized(body)
Status code: `401`

#### forbidden(body)
Status code: `403`

#### notFound(body)
Status code: `404`

#### notAcceptable(body)
Status code: `406`

#### requestTimeout(body)
Status code: `408`

#### locked(body)
Status code: `423`

### 5xx: Server Error

#### serverError(body)
Status code: `500`

#### serviceUnavailable(body)
Status code: `503`

### Aliases

#### ok(body)
Alias of method `success`

## Links
More info about http status codes: 

- [Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
- [W3C](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

## Examples

### success(body)

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
  // ...
  res.rest.forbidden();
});
```

Response status: `403`

Response body:

```json
{}
```

If options `showDefaultMessage` and/or `showStatusCode` true

```json
{
  "message": "Forbidden",
  "status": 403
}
```

## License
[The MIT License](./LICENSE)
