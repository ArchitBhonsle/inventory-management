import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_KEY } from '../constants';

export function createToken(username: string): string {
    let token = '';
    try {
        token = jwt.sign(username, ACCESS_TOKEN_KEY, { expiresIn: '7d' });
    } catch (err) {
        console.log(err);
    }
    return token;
}
