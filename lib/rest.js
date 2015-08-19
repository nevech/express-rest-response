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

// Dynamic creation methods
for (var i = 0; i <= methods.length - 1; i++) {
  var method = methods[i];

  (function (method) {
    Rest.prototype[method.name] = function () {
      console.log('Call method: ', method);
      console.log('arguments', arguments);

      var body = arguments[0];
      var statusCode = method.status;

      if (arguments.length > 1) {
        statusCode = arguments[1];
      }

      this._sendResponse(body, statusCode);
    };
  })(method)
};

Rest.prototype._sendResponse = function(data, statusCode) {  
  var body = data || {};

  if (typeof data === 'string') {
    body = {
      message: data
    };
  }

  if (!body.message && this.options.showDefaultMessage) {
    body.message = http.STATUS_CODES[statusCode] || '';
  }

  if (this.options.showStatusCode) {
    body.status = statusCode;
  }
  console.log('statusCode: ' + statusCode);
  this._res.status(statusCode);
  this._res.json(body);

  return this;
};

Rest.prototype.isError = function(err, next, errorCode) {
  if (!err) return false;

  if (typeof err === 'string') {
    var method = Rest.getMethodByCode(errorCode) || 'badRequest';

    this[method](err)
    return true;
  }

  if (typeof next === 'function') next(err);

  return true;
};

Rest.getMethodByCode = function (code) {  
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

module.exports = Rest;