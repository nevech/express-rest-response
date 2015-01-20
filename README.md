# express-rest-response

An express.js middleware for REST API.

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
```

### restResponse(options)

The options are:
- `showStatusCode` - If `true`, then added `status` parameter in the response body. (Default: false)
- `showDefaultMessage` - If `true`, then added `message` parameter in the response body. (Default: false)

<!-- ## Methods

- `success(body, statusCode)` - --> 