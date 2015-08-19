var http = require('http');
var methods = require('./methods.js');

/**
 * Rest
 * @typedef Rest
 * @type {function}
 * @param {object} response object
 * @param {object} options
 */
function Rest (res, options) {
  this._res = res;

  var dafaultOptions = {
    showStatusCode: false,
    showDefaultMessage: false
  };

  this.options = options || dafaultOptions;
}

for (var i = methods.length - 1; i >= 0; i--) {
  var method = methods[i];

  Rest.prototype[method.name] = function () {
    var body = arguments[0];
    var statusCode = method.status;

    if (arguments.length > 1) {
      statusCode = arguments[1];
    }

    this.sendResponse(body, statusCode);
  };
};

Rest.prototype.isError = function(err, next, errorCode) {
  if (!err) return false;

  if (typeof err === 'string') {
    var method = this.getMethodByCode(errorCode) || 'badRequest';

    this[method](err)
    return true;
  }

  if (typeof next === 'function') next(err);

  return true;
};

Rest.prototype.getMethodByCode = function (code) {  
  var methodName = undefined;

  for (var i = methods.length - 1; i >= 0; i--) {
    var method = methods[i];

    if (method.status == code) {
      methodName = method.name;
      break;
    }
  };

  return methodName;
};

/**
 * Send response
 * @param  {object} body response
 * @param  {int} status code response
 * @return {object} this
 */
Rest.prototype.sendResponse = function(data, statusCode) {  
  var body = {};

  switch (typeof data) {
    case 'object':
      body = data;
      break;
    case 'string':
      body.message = data;
      break;
  }

  if (!body.message && this.options.showDefaultMessage) {
    body.message = http.STATUS_CODES[statusCode] || '';
  }

  if (this.options.showStatusCode) {
    body.status = statusCode;
  }

  this._res.json(body);

  return this;
};

module.exports = Rest;