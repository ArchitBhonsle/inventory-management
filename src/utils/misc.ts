import e from 'express';

export type MyContext = {
    username: string | null;
    req: e.Request<any>;
    res: e.Response<any>;
};
