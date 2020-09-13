"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsernameFromToken = exports.getTokenFromHeader = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
function createToken(username) {
    let token = '';
    try {
        token = jsonwebtoken_1.default.sign(username, constants_1.ACCESS_TOKEN_KEY, { expiresIn: '7d' });
    }
    catch (err) {
        console.log(err);
    }
    finally {
        return token;
    }
}
exports.createToken = createToken;
function getTokenFromHeader(authHeader) {
    if (authHeader) {
        return authHeader.split(' ')[1];
    }
    else {
        return '';
    }
}
exports.getTokenFromHeader = getTokenFromHeader;
function getUsernameFromToken(token) {
    let username = '';
    try {
        username = jsonwebtoken_1.default.verify(token, constants_1.ACCESS_TOKEN_KEY).toString();
    }
    catch (err) {
    }
    finally {
        return username;
    }
}
exports.getUsernameFromToken = getUsernameFromToken;
//# sourceMappingURL=jwt.js.map