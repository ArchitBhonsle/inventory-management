import 'reflect-metadata';
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { ItemResolver } from './resolvers/item';
import { getUserByUsername } from './utils/db';
import { getTokenFromHeader, getUsernameFromToken } from './utils/jwt';
import { seed } from './utils/seed';

const main = async () => {
    await mongoose.connect('mongodb://localhost/inventory-management', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    await seed();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver, ItemResolver ]
        }),
        context: async ({ req }) => {
            const token = getTokenFromHeader(req.headers.authorization);
            const username = getUsernameFromToken(token);
            const user = await getUserByUsername(username);
            return { user };
        }
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('🚀 at http://localhost:4000/graphql');
    });
};

main();
