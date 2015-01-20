var http = require('http');

var Rest = function (res, options) {
  this._res = res;

  // Init options
  var dafaultOptions = {
    body: {
      statusCode: false,
      showDafultMessage: false
    }
  };

  this.options = options || dafaultOptions;
};

Rest.prototype._setStatus = function(status) {
  this.statusCode = status;
  this._res.status(status);
  return this;
};

Rest.prototype._createBody = function(data, message) {
  var data = data || {};

  if (message) {
    data.message = message;
  } else if (this.options.body && this.options.body.showDafultMessage) {
    data.message = http.STATUS_CODES[this.statusCode] || '';
  }

  return data;
};

Rest.prototype.sendResponse = function (data, statusCode) {
  if (statusCode) {
    this._setStatus(statusCode);
  }

  var data = data || this._createBody({});

  if (this.options.body && this.options.body.statusCode) {
    data.status = this.statusCode;
  }

  this._res.json(data);

  return this;
};

Rest.prototype.success = function(data, statusCode) {
  var response = {};

  if (data) {
    switch (typeof data) {
      case 'object':
        response = data;
        break;
      case 'string':
        response.message = data;
        break;
      default:
        throw new Error('First argument must be "object" or "string"');
    }
  }

  return this.sendResponse(response, statusCode || 200);
};

Rest.prototype.sendError = function(status, message) {
  this._setStatus(status);
  var body = this._createBody({}, message);
  return this.sendResponse(body);
};

Rest.prototype.badRequest = function(message) {
  this.sendError(400, message);
};

Rest.prototype.unauthorized = function(message) {
  this.sendError(401, message);
};

Rest.prototype.notFound = function(message) {
  this.sendError(404, message);
};

Rest.prototype.serverError = function(message) {
  this.sendError(500, message);
};

module.exports = Rest;