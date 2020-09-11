import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { UserResolver } from './resolvers/user';
import { ItemResolver } from './resolvers/item';

const main = async () => {
    await mongoose.connect('mongodb://localhost/inventory-management', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver, ItemResolver ],
            validate: false
        })
    });

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log('🚀 at http://localhost:4000/graphql');
    });
};

main();
