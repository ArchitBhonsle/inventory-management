import 'reflect-metadata';
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { ItemResolver } from './resolvers/item';
import cookieParser from 'cookie-parser';
import { getUsernameFromToken } from './utils/jwt';
import { MyContext } from './utils/misc';
import { COOKIES_SECRET, COOKIE_TAG } from './constants';
// import { seed } from './utils/seed';

const main = async () => {
    await mongoose.connect('mongodb://localhost/inventory-management', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    // await seed();

    const app = express();

    app.use(cookieParser(COOKIES_SECRET));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver, ItemResolver ]
        }),
        context: async ({ req, res }): Promise<MyContext> => {
            const token = req.signedCookies[COOKIE_TAG];
            const username = getUsernameFromToken(token);
            return { username, req, res };
        }
    });

    apolloServer.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: 'http://localhost:3000'
        }
    });

    app.listen(4000, () => {
        console.log('🚀 at http://localhost:4000/graphql');
    });
};

main();
