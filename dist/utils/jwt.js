"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoFromToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
function createToken(content) {
    let token = '';
    try {
        token = jsonwebtoken_1.default.sign(content, constants_1.ACCESS_TOKEN_KEY, { expiresIn: '7d' });
    }
    catch (err) {
    }
    finally {
        return token;
    }
}
exports.createToken = createToken;
function getUserInfoFromToken(token) {
    let userInfo = null;
    try {
        const parsedToken = jsonwebtoken_1.default.verify(token, constants_1.ACCESS_TOKEN_KEY);
        userInfo = {
            username: parsedToken.username,
            isAdmin: parsedToken.isAdmin
        };
    }
    catch (err) {
    }
    finally {
        return userInfo;
    }
}
exports.getUserInfoFromToken = getUserInfoFromToken;
//# sourceMappingURL=jwt.js.map