import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://maxikgreat.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://maxikgreat.eu.auth0.com/api/v2/',
  issuer: 'https://maxikgreat.eu.auth0.com/',
  algorithms: ['RS256'],
});
