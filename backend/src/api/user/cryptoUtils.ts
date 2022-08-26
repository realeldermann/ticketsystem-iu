import crypto from 'crypto';

export function generateRandomString(length: number) {
    return crypto.randomBytes(length).toString('hex');
}

export function generateSalt() {
    return generateRandomString(32);
}

export function hashPassword(password: string, salt: string) {
    return crypto.createHash('sha256').update(password+'-SALT:'+salt).digest('base64');
}