<<<<<<< HEAD
import mongoose from "mongoose";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
=======
import 'reflect-metadata';
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { ItemResolver } from './resolvers/item';
import { getTokenFromHeader, getUsernameFromToken } from './utils/jwt';
import { seed } from './utils/seed';
<<<<<<< HEAD
import { MyContext } from './utils/misc';
=======
>>>>>>> da8f112dd8f9a1e11f95947895a0d2ac8345711e
>>>>>>> 98b7fb90ab3175a9f24d8c29c7d49c4a1d73151c

const main = async () => {
  await mongoose.connect("mongodb://localhost/inventory-management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

<<<<<<< HEAD
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
  });
=======
    await seed();

    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [ UserResolver, ItemResolver ]
        }),
        context: async ({ req }): Promise<MyContext> => {
            const token = getTokenFromHeader(req.headers.authorization);
            const username = getUsernameFromToken(token);
            return { username };
        }
    });
>>>>>>> da8f112dd8f9a1e11f95947895a0d2ac8345711e

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("🚀 at http://localhost:4000/graphql");
  });
};

main();
