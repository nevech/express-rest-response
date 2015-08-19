module.exports = [
  // 1xx: Informational
  {
    status: 100,
    name: 'continue'
  },
  // 2xx: Success
  {
    status: 200,
    name: 'success',
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
    status: 202,
    name: 'accepted'
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