/*!
 * express-rest-response
 * Copyright(c) 2015 Ruslan Nevecherya
 */

/**
 * Module dependencies.
 */

var Rest = require('./lib/rest.js');

/**
 * Create a middleware.
 * 
 * @param {object} [options]
 * @return {function}
 */

exports = module.exports = function RestResponse(options) {
  return function RestResponse(req, res, next) {
    res.rest = new Rest(res, options);
    next();
  };
};
