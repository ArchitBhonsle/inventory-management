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
const constants_1 = require("../constants");
const db_1 = require("../utils/db");
const Item_1 = require("../models/Item");
let UserResolver = class UserResolver {
    users({ userInfo }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userInfo && userInfo.isAdmin)
                return User_1.UserModel.find({});
            return [];
        });
    }
    getUser(usernameOrEmail, { userInfo }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInfo || !userInfo.isAdmin)
                return null;
            let foundUser = null;
            if (validation_1.isEmail(usernameOrEmail)) {
                foundUser = yield User_1.UserModel.findOne({
                    email: usernameOrEmail
                });
            }
            else if (validation_1.isUsername(usernameOrEmail)) {
                foundUser = yield User_1.UserModel.findOne({
                    username: usernameOrEmail
                });
            }
            return foundUser;
        });
    }
    me({ userInfo }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInfo) {
                return null;
            }
            const user = yield db_1.getUserByUsername(userInfo.username);
            if (!user)
                return null;
            return user;
        });
    }
    myItems({ userInfo }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInfo) {
                return [];
            }
            const user = yield db_1.getUserByUsername(userInfo.username);
            if (!user)
                return [];
            const itemIds = user.items;
            const items = itemIds.map((itemId) => Item_1.ItemModel.findById(itemId));
            return items;
        });
    }
    getUsersItems(usernameOrEmail, { userInfo }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userInfo || !userInfo.isAdmin) {
                return [];
            }
            let foundUser = null;
            if (validation_1.isEmail(usernameOrEmail)) {
                foundUser = yield User_1.UserModel.findOne({
                    email: usernameOrEmail
                });
            }
            else if (validation_1.isUsername(usernameOrEmail)) {
                foundUser = yield User_1.UserModel.findOne({
                    username: usernameOrEmail
                });
            }
            if (!foundUser)
                return [];
            const itemIds = foundUser.items;
            const items = itemIds.map((itemId) => Item_1.ItemModel.findById(itemId));
            return items;
        });
    }
    login(usernameOrEmail, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (validation_1.isEmail(usernameOrEmail)) {
                const user = yield User_1.UserModel.findOne({
                    email: usernameOrEmail
                });
                if (!user)
                    return 'user not found';
                if (yield argon2_1.default.verify(user.password, password)) {
                    res.cookie(constants_1.COOKIE_TAG, jwt_1.createToken({
                        username: user.username,
                        isAdmin: user.isAdmin
                    }), {
                        signed: true,
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax'
                    });
                    return 'successfully logged in';
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
                    res.cookie(constants_1.COOKIE_TAG, jwt_1.createToken({
                        username: user.username,
                        isAdmin: user.isAdmin
                    }), {
                        signed: true,
                        httpOnly: true,
                        secure: false,
                        sameSite: 'lax'
                    });
                    return 'successfully logged in';
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
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie(constants_1.COOKIE_TAG);
                return 'logged out';
            }
            catch (err) {
                return 'unknown error please try again';
            }
        });
    }
    register(username, email, password, department, designation, bio, image, firstname, lastname, isAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield argon2_1.default.hash(password);
            const newUser = new User_1.UserModel({
                username,
                email,
                department,
                designation,
                bio,
                image,
                firstname,
                lastname,
                isAdmin,
                password: hashedPassword
            });
            try {
                yield newUser.save();
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
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUser", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => [Item_1.Item]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "myItems", null);
__decorate([
    type_graphql_1.Query(() => [Item_1.Item]),
    __param(0, type_graphql_1.Arg('usernameOrEmail', () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUsersItems", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('usernameOrEmail', () => String)),
    __param(1, type_graphql_1.Arg('password', () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('username', () => String)),
    __param(1, type_graphql_1.Arg('email', () => String)),
    __param(2, type_graphql_1.Arg('password', () => String)),
    __param(3, type_graphql_1.Arg('department', () => String)),
    __param(4, type_graphql_1.Arg('designation', () => String)),
    __param(5, type_graphql_1.Arg('bio', () => String)),
    __param(6, type_graphql_1.Arg('image', () => String)),
    __param(7, type_graphql_1.Arg('firstname', () => String)),
    __param(8, type_graphql_1.Arg('lastname', () => String)),
    __param(9, type_graphql_1.Arg('isAdmin', () => Boolean)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map