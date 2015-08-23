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

**All methods receive option `body`, type: `object` or `string`.**

**1xx: Informational**

| name  | status code | Description |
| ----------- | :-----------: | ----------- |
| continue  | 100 | The client SHOULD continue with its request. |
| switchingProtocols  | 101 | This means the requester has asked the server to switch protocols and the server is acknowledging that it will do so. |
| processing  | 102 | As a WebDAV request may contain many sub-requests involving file operations, it may take a long time to complete the request. This code indicates that the server has received and is processing the request, but no response is available yet. This prevents the client from timing out and assuming the request was lost. |

**2xx: Success**

| name  | status code | Description |
| ------------- | :---------------: | ------------- |
| success  | 200 | The request has succeeded. |
| ok  | 200 | Alias of method `success` |
| created  | 201 | The request has been fulfilled and resulted in a new resource being created. |
| accepted  | 201 | The request has been accepted for processing, but the processing has not been completed. |
| nonAuthInfo  | 201 | Non-Authoritative Information. The returned metainformation in the entity-header is not the definitive set as available from the origin server, but is gathered from a local or a third-party copy. |
| noContent | 204 | The server has fulfilled the request but does not need to return an entity-body, and might want to return updated metainformation. |
| resetContent | 205 | The server has fulfilled the request and the user agent SHOULD reset the document view which caused the request to be sent. |
| partialContent | 206 | The server has fulfilled the partial GET request for the resource. |

**4xx: Client Error**

| name  | status code | Description |
| ------------- | :---------------: | ------------- |
| badRequest | 400 | The request could not be understood by the server due to malformed syntax. |
| unauthorized | 401 | The request requires user authentication. |
| forbidden | 403 | The server understood the request, but is refusing to fulfill it. |
| notFound | 404 | The server has not found anything matching the Request-URI. |
| notAcceptable | 406 | The resource identified by the request is only capable of generating response entities which have content characteristics not acceptable according to the accept headers sent in the request. |
| requestTimeout | 408 | The server timed out waiting for the request. |
| locked | 423 | The resource that is being accessed is locked |

**5xx: Server Error**

| name  | status code | Description |
| ------------- | :---------------: | ------------- |
| serverError | 500 | The server encountered an unexpected condition which prevented it from fulfilling the request. |
| serviceUnavailable | 503 | The server is currently unable to handle the request due to a temporary overloading or maintenance of the server. |

*More info about http status codes: [Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes), [W3C](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)*

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

If options `showDefaultMessage` true

```json
{
  "message": "Forbidden"
}
```

### notFound(body)

```js
app.get('/posts/:id', function (req, res, next) {
  // ...
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
