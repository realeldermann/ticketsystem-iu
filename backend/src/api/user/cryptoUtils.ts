import crypto from 'crypto';

export function generateRandomString(length: number) { //random String nach länge
    return crypto.randomBytes(length).toString('hex');
}

export function generateSalt() { //random Salt für Passwörter
    return generateRandomString(32);
}

export function hashPassword(password: string, salt: string) { //hasht ein Passwort mit Salt
    return crypto.createHash('sha256').update(password+'-SALT:'+salt).digest('base64');
}