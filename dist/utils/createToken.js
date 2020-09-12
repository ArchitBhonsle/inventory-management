"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = void 0;
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
    return token;
}
exports.createToken = createToken;
//# sourceMappingURL=createToken.js.map