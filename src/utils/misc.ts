import e from 'express';
import { TokenPayload } from './jwt';

export type MyContext = {
    userInfo: TokenPayload | null;
    req: e.Request<any>;
    res: e.Response<any>;
};
