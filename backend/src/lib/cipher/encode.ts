import { Cipher, randomBytes, createCipheriv } from 'crypto';
import { getCipherKey } from '../cipher-key';

export const encryptText = ({ text, password }: { text: string, password: string }): string => {
    const iv: Buffer = randomBytes(16);
    const CIPHER_KEY: Buffer = getCipherKey(password);
    const cipher: Cipher = createCipheriv("AES-256-CBC", CIPHER_KEY, iv);
    let encrypted: Buffer = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    const token = `${iv.toString('hex')}:${encrypted.toString('hex')}`;

    return token;
};

export default encryptText