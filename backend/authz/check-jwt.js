const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { domain, audience } = require('../env.dev');

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience: audience,
  issuer: `https://${domain}/`,
  algorithms: ['RS256'],
}).unless({ path: ['/'] });

module.exports = {
  jwtCheck,
};
