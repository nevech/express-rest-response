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
    showDefaultMessage: false
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
Rest.prototype.sendResponse = function (body, statusCode) {
  if (statusCode) {
    this._setStatus(statusCode);
  }

  var body = body || this._createBody({});

  if (this.options.showStatusCode) {
    body.status = this.statusCode;
  }

  this._res.json(body);

  return this;
};

/**
 * Send response success
 * @param  {object} body response (Default: empty object)
 * @param  {int} status code response (Default: 200)
 * @return {object} this
 */
Rest.prototype.success = function(body, statusCode) {
  var body = {};

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
 * Send response error
 * @param  {int} status code
 * @param  {string} param message in body (Default: param is missing)
 * @return {object} this
 */
Rest.prototype.sendError = function(status, message) {
  this._setStatus(status);
  var body = this._createBody({}, message);
  return this.sendResponse(body);
};

/**
 * Send response error (Bad request, status 400)
 * @param  {string} param message in body (Default: param is missing)
 * @return {object} this
 */
Rest.prototype.badRequest = function(message) {
  this.sendError(400, message);
};

/**
 * Send response error (Unauthorized, status 401)
 * @param  {string} param message in body (Default: param is missing)
 * @return {object} this
 */
Rest.prototype.unauthorized = function(message) {
  this.sendError(401, message);
};

/**
 * Send response error (Not found, status 404)
 * @param  {string} param message in body (Default: param is missing)
 * @return {object} this
 */
Rest.prototype.notFound = function(message) {
  this.sendError(404, message);
};

/**
 * Send response error (Server error, status 500)
 * @param  {string} param message in body (Default: param is missing)
 * @return {object} this
 */
Rest.prototype.serverError = function(message) {
  this.sendError(500, message);
};

/**
 * Module exports.
 */

module.exports = Rest;