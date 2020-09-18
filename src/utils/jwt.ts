import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY } from '../constants';

export type TokenPayload = {
    username: string;
    isAdmin: boolean;
};

export function createToken(content: TokenPayload): string {
    let token = '';
    try {
        token = jwt.sign(content, ACCESS_TOKEN_KEY, { expiresIn: '7d' });
    } catch (err) {
        // console.log(err);
    } finally {
        return token;
    }
}

export function getUserInfoFromToken(token: string): TokenPayload | null {
    let userInfo = null;
    try {
        const parsedToken = jwt.verify(token, ACCESS_TOKEN_KEY) as TokenPayload;
        userInfo = {
            username: parsedToken.username,
            isAdmin: parsedToken.isAdmin
        };
    } catch (err) {
        // console.log(err);
    } finally {
        return userInfo;
    }
}
