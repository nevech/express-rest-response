module.exports = [
  // 1xx: Informational
  {
    status: 100,
    name: 'continue'
  },
  {
    status: 101,
    name: 'switchingProtocols'
  },
  {
    status: 102,
    name: 'processing'
  },
  // 2xx: Success
  {
    status: 200,
    name: 'success',
  },
  {
    status: 200,
    name: 'ok',
  },
  {
    status: 201,
    name: 'created'
  },
  {
    status: 202,
    name: 'accepted'
  },
  {
    status: 203,
    name: 'nonAuthInfo' // Non-Authoritative Information
  },
  {
    status: 204,
    name: 'noContent'
  },
  {
    status: 205,
    name: 'resetContent'
  },
  {
    status: 206,
    name: 'partialContent'
  },
  // 4xx: Client Error
  {
    status: 400,
    name: 'badRequest',
  },
  {
    status: 401,
    name: 'unauthorized',
  },
  {
    status: 403,
    name: 'forbidden',
  },
  {
    status: 404,
    name: 'notFound',
  },
  {
    status: 406,
    name: 'notAcceptable',
  },
  {
    status: 408,
    name: 'requestTimeout',
  },
  {
    status: 423,
    name: 'locked',
  },
  // 5xx: Server Error
  {
    status: 500,
    name: 'serverError',
  },  
  {
    status: 503,
    name: 'serviceUnavailable'
  }
]; 