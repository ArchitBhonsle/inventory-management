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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Item_1 = require("../models/Item");
const User_1 = require("../models/User");
let ItemResolver = class ItemResolver {
    items() {
        return Item_1.ItemModel.find({});
    }
    getItemsByName(itemName) {
        return Item_1.ItemModel.find({ name: itemName });
    }
    getItemsByCategoryName(itemCategoryName) {
        return Item_1.ItemModel.find({ category: itemCategoryName });
    }
    getItemsByDepartment(deptName) {
        return Item_1.ItemModel.find({ department: deptName });
    }
    getItemById(itemID) {
        return Item_1.ItemModel.findById(itemID);
    }
    createItem(itemName, itemCategory, itemDepartment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (itemCategory === '') {
                itemCategory = 'unassigned';
            }
            const item = new Item_1.ItemModel({
                name: itemName,
                category: itemCategory,
                department: itemDepartment,
                history: {
                    name: itemDepartment,
                    isDepartment: true
                }
            });
            try {
                yield item.save();
                return '';
            }
            catch (err) {
                console.log(err);
                return 'Error';
            }
        });
    }
    transferItem(itemId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield Item_1.ItemModel.findById(itemId);
            if (!item) {
                return 'Item doesn\'t exist';
            }
            const lastUserUsername = item.history[item.history.length - 1].name;
            yield User_1.UserModel.findOneAndUpdate({ username: lastUserUsername }, { $pull: { items: itemId } }, { new: true });
            const user = yield User_1.UserModel.findOneAndUpdate({ username: username }, { $push: { items: itemId } }, { new: true });
            if (!user) {
                return 'User doesn\'t exist';
            }
            yield Item_1.ItemModel.findOneAndUpdate({ _id: itemId }, {
                $push: {
                    history: { name: user.username, isDepartment: user.isAdmin }
                }
            });
            return 'Success';
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Item_1.Item], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "items", null);
__decorate([
    type_graphql_1.Query(() => [Item_1.Item]),
    __param(0, type_graphql_1.Arg('name', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "getItemsByName", null);
__decorate([
    type_graphql_1.Query(() => [Item_1.Item]),
    __param(0, type_graphql_1.Arg('category', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "getItemsByCategoryName", null);
__decorate([
    type_graphql_1.Query(() => [Item_1.Item]),
    __param(0, type_graphql_1.Arg('department', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "getItemsByDepartment", null);
__decorate([
    type_graphql_1.Query(() => [Item_1.Item]),
    __param(0, type_graphql_1.Arg('id', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "getItemById", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('name', () => String)),
    __param(1, type_graphql_1.Arg('category', () => String)),
    __param(2, type_graphql_1.Arg('department', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "createItem", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg('id', () => String)),
    __param(1, type_graphql_1.Arg('username', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "transferItem", null);
ItemResolver = __decorate([
    type_graphql_1.Resolver()
], ItemResolver);
exports.ItemResolver = ItemResolver;
//# sourceMappingURL=item.js.map