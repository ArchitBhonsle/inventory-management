import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY } from '../constants';

interface TokenPayload {
    username: string;
    iat: number;
    exp: number;
}

export function createToken(username: string): string {
    let token = '';
    try {
        token = jwt.sign({ username }, ACCESS_TOKEN_KEY, { expiresIn: '7d' });
    } catch (err) {
        // console.log(err);
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

export function getUsernameFromToken(token: string): string | null {
    let username = null;
    try {
        const parsedToken = jwt.verify(token, ACCESS_TOKEN_KEY) as TokenPayload;
        username = parsedToken.username;
    } catch (err) {
        // console.log(err);
    } finally {
        return username;
    }
}
