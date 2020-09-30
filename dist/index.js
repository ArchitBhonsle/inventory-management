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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jwt_1 = require("./utils/jwt");
const constants_1 = require("./constants");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    dotenv_1.default.config();
    const MONGO = String(process.env.MONGO);
    const PORT = Number(process.env.PORT) || 4000;
    yield mongoose_1.default.connect(String(MONGO), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    const app = express_1.default();
    app.use(cookie_parser_1.default(constants_1.COOKIES_SECRET));
    app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_1.UserResolver, item_1.ItemResolver]
        }),
        context: ({ req, res }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.signedCookies[constants_1.COOKIE_TAG];
            const userInfo = jwt_1.getUserInfoFromToken(token);
            return { userInfo, req, res };
        })
    });
    apolloServer.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: 'http://localhost:3000'
        }
    });
    app.get('*', (_, res) => {
        res.sendFile(path_1.default.join(__dirname, '/../client/build', 'index.html'));
    });
    app.listen(PORT, () => {
        console.log('🚀 at http://localhost:4000/graphql');
    });
});
main();
//# sourceMappingURL=index.js.map