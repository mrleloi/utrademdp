import appConfig from '@config/app.config';
import * as crypto from 'crypto';
const key = Buffer.from(appConfig.encryption.key, 'utf-8');

export const encrypt = (plainText: string) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(plainText, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}.${authTag}.${encrypted}`;
};

export const decrypt = (encryptedData: string) => {
  try {
    const [ivHex, authTagHex, encrypted] = encryptedData.split('.');

    if (!ivHex || !authTagHex || !encrypted) {
      throw new Error('Invalid encrypted data format');
    }

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(ivHex, 'hex'),
    );
    decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));

    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  } catch (e) {
    return '';
  }
};
