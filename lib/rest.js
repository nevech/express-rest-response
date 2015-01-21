/**
 * Module dependencies.
 */

var http = require('http');

/**
 * Rest
 * @typedef Rest
 * @type {function}
 * @param {object} response object
 * @param {object} options
 */
var Rest = function (res, options) {
  this._res = res;

  // Init options
  var dafaultOptions = {
    showStatusCode: false,
    showDefaultMessage: false,
    errorFieldMessage: 'error'
  };

  this.options = options || dafaultOptions;
};

/**
 * Set status code response
 * @param {int} status
 * @return {object} this
 */
Rest.prototype._setStatus = function(status) {
  this.statusCode = status;
  this._res.status(status);
  return this;
};

/**
 * Create body response
 * @param  {object} body Default empty object
 * @param  {string} message This param will add to body 
 * @return {object}
 */
Rest.prototype._createBody = function(body, message) {
  var data = body || {};

  if (message) {
    data.message = message;
  } else if (this.options.showDefaultMessage) {
    data.message = http.STATUS_CODES[this.statusCode] || '';
  }

  return data;
};

/**
 * Send response
 * @param  {object} body response
 * @param  {int} status code response
 * @return {object} this
 */
Rest.prototype.sendResponse = function (data, statusCode) {
  if (statusCode) {
    this._setStatus(statusCode);
  }

  var body = (typeof data == 'object')? data : {};
  var message = (typeof data == 'string')? data : '';

  body = this._createBody(body, message);

  if (this.options.showStatusCode) {
    body.status = this.statusCode;
  }

  this._res.json(body);

  return this;
};

/**
 * Send response success
 * @param  {string|object}
 * @param  {int} status code response (Default: 200)
 * @return {object} this
 */
Rest.prototype.success = function(body, statusCode) {
  var body = body || {};

  if (body) {
    switch (typeof body) {
      case 'object':
        body = body;
        break;
      case 'string':
        body.message = body;
        break;
      default:
        throw new Error('First argument must be "object" or "string"');
    }
  }

  return this.sendResponse(body, statusCode || 200);
};

/**
 * Send response error (Bad request, status 400)
 * @param  {string|object}
 * @return {object} this
 */
Rest.prototype.badRequest = function(body) {
  this.sendResponse(body, 400);
};

/**
 * Send response error (Unauthorized, status 401)
 * @param  {string|object}
 * @return {object} this
 */
Rest.prototype.unauthorized = function(body) {
  this.sendResponse(body, 401);
};

/**
 * Send response error (Forbidden, status 403)
 * @param  {string|object} 
 * @return {object} this
 */
Rest.prototype.forbidden = function(body) {
  this.sendResponse(body, 403);
};

/**
 * Send response error (Not found, status 404)
 * @param  {string|object} 
 * @return {object} this
 */
Rest.prototype.notFound = function(body) {
  this.sendResponse(body, 404);
};

/**
 * Send response error (Server error, status 500)
 * @param  {string|object} 
 * @return {object} this
 */
Rest.prototype.serverError = function(body) {
  this.sendResponse(body, 500);
};

/**
 * Module exports.
 */

module.exports = Rest;