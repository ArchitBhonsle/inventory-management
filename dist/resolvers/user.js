"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../models/User");
const argon2_1 = __importDefault(require("argon2"));
const validation_1 = require("../utils/validation");
const jwt_1 = require("../utils/jwt");
const auth_1 = require("../utils/auth");
let UserResolver = class UserResolver {
    users({ username }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authCheck = yield auth_1.isAdmin(username, []);
            if (authCheck) {
                return authCheck;
            }
            return User_1.UserModel.find({});
        });
    }
    getUser(usernameOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = null;
            if (validation_1.isEmail(usernameOrEmail)) {
                user = yield User_1.UserModel.findOne({
                    email: usernameOrEmail
                });
            }
            else if (validation_1.isUsername(usernameOrEmail)) {
                user = yield User_1.UserModel.findOne({
                    username: usernameOrEmail
                });
            }
            return user;
        });
    }
    register(username, email, password, department) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield argon2_1.default.hash(password);
            const user = new User_1.UserModel({
                username: username,
                email: email,
                password: hashedPassword,
                department: department
            });
            try {
                yield user.save();
                return '';
            }
            catch (err) {
                console.log(err);
                if (err === 11000) {
                    return 'User with same username or password already exists';
                }
                return 'Unknown error. Try again or contact admin.';
            }
        });
    }
    login(usernameOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validation_1.isEmail(usernameOrEmail)) {
                const user = yield User_1.UserModel.findOne({
                    email: usernameOrEmail
                });
                if (!user) {
                    return 'user not found';
                }
                if (yield argon2_1.default.verify(user.password, password)) {
                    return jwt_1.createToken(user.username);
                }
                else {
                    return 'wrong passoword';
                }
            }
            else if (validation_1.isUsername(usernameOrEmail)) {
                const user = yield User_1.UserModel.findOne({
                    username: usernameOrEmail
                });
                if (!user) {
                    return 'user not found';
                }
                if (yield argon2_1.default.verify(user.password, password)) {
                    return jwt_1.createToken(user.username);
                }
                else {
                    return 'wrong passoword';
                }
            }
            else {
                return 'neither a username or an email';
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('usernameOrEmail', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('username', () => String)),
    __param(1, type_graphql_1.Arg('email', () => String)),
    __param(2, type_graphql_1.Arg('password', () => String)),
    __param(3, type_graphql_1.Arg('department', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('usernameOrEmail', () => String)),
    __param(1, type_graphql_1.Arg('password', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map