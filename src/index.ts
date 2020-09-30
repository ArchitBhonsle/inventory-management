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
import path from 'path';
import dotenv from 'dotenv';

const main = async () => {
  dotenv.config();

  const MONGO = String(process.env.MONGO);
  const PORT = Number(process.env.PORT) || 4000;

  await mongoose.connect(String(MONGO), {
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

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log('🚀 at http://localhost:4000/graphql');
  });
};

main();
