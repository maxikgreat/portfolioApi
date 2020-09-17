declare namespace Express {
  export interface Request { // Auth0 middleware data
    user: {
      'https://portfolio-max.com/roles': string[],
      iss: string,
      sub: string,
      aud: string[],
      iat: number,
      exp: number,
      azp: string,
      scope: string,
    },
  }
}