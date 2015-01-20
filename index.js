var Rest = require('./lib/rest.js');

exports = module.exports = function RestResponse(options) {
  return function RestResponse(req, res, next) {
    res.rest = new Rest(res, options);
    next();
  };
};
