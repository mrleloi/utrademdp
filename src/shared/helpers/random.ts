import * as cryptoModule from 'crypto';

export const generateRandomString = () => {
  return cryptoModule
    .randomBytes(Math.ceil(24 / 2))
    .toString('hex')
    .slice(0, 24);
};
