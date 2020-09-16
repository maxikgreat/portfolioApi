declare namespace Express {
  export interface Request {
    user: {
      'https://portfolio-max.com/roles': [ 'guest', 'admin' ],
      iss: 'https://maxikgreat.eu.auth0.com/',
      sub: 'google-oauth2|100859891013293195235',
      aud: [
        'https://maxikgreat.eu.auth0.com/api/v2/',
        'https://maxikgreat.eu.auth0.com/userinfo'
      ],
      iat: 1600262579,
      exp: 1600348979,
      azp: 'GM2UxuskeBRrfPq16Q0J7mx3ERIBDEsQ',
      scope: 'openid profile email'
    },
  }
}