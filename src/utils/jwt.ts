import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY } from '../constants';

export function createToken(username: string): string {
    let token = '';
    try {
        token = jwt.sign(username, ACCESS_TOKEN_KEY, { expiresIn: '7d' });
    } catch (err) {
        console.log(err);
    } finally {
        return token;
    }
}

export function getTokenFromHeader(authHeader: string | undefined): string {
    if (authHeader) {
        return authHeader.split(' ')[1];
    } else {
        return '';
    }
}

export function getUsernameFromToken(token: string): string {
    let username = '';
    try {
        username = jwt.verify(token, ACCESS_TOKEN_KEY).toString();
    } catch (err) {
        // console.log(err);
    } finally {
        return username;
    }
}
