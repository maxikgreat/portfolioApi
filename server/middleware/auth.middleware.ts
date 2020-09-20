import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { Request, Response, NextFunction } from 'express';

import { Role } from '../../types/index';

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

export const checkRole = (role: Role) => (req: Request, res: Response, next: NextFunction) => {
  if(req.user["https://portfolio-max.com/roles"].includes(role)) {
    return next();
  }
  return res.status(401).send('You have no access rights for this action');
};
