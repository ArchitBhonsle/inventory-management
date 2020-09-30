import 'reflect-metadata';
import mongoose from 'mongoose';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/user';
import { ItemResolver } from './resolvers/item';
import cookieParser from 'cookie-parser';
import { getUserInfoFromToken } from './utils/jwt';
import { MyContext } from './utils/misc';
import { COOKIES_SECRET, COOKIE_TAG } from './constants';
import dotenv from 'dotenv';

const main = async () => {
  dotenv.config();

  await mongoose.connect(String(process.env.MONGO), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const app = express();

  app.use(cookieParser(COOKIES_SECRET));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ UserResolver, ItemResolver ]
    }),
    context: async ({ req, res }): Promise<MyContext> => {
      const token = req.signedCookies[COOKIE_TAG];
      const userInfo = getUserInfoFromToken(token);
      return { userInfo, req, res };
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
