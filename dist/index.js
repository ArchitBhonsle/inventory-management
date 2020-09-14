"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const item_1 = require("./resolvers/item");
const db_1 = require("./utils/db");
const jwt_1 = require("./utils/jwt");
const seed_1 = require("./utils/seed");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://localhost/inventory-management", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });
    yield seed_1.seed();
    const app = express_1.default();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
<<<<<<< HEAD
            resolvers: [hello_1.HelloResolver, user_1.UserResolver],
            validate: false,
        }),
=======
            resolvers: [user_1.UserResolver, item_1.ItemResolver]
        }),
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = jwt_1.getTokenFromHeader(req.headers.authorization);
            const username = jwt_1.getUsernameFromToken(token);
            const user = yield db_1.getUserByUsername(username);
            return { user };
        })
>>>>>>> da8f112dd8f9a1e11f95947895a0d2ac8345711e
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log("🚀 at http://localhost:4000/graphql");
    });
});
main();
//# sourceMappingURL=index.js.map