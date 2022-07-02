import { createHash } from 'crypto';

export const getCipherKey = (key: string): Buffer => createHash('sha256').update(key).digest();