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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = exports.Item = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const mongoose_1 = require("mongoose");
let HistoryEntry = class HistoryEntry {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], HistoryEntry.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], HistoryEntry.prototype, "isDepartment", void 0);
HistoryEntry = __decorate([
    type_graphql_1.ObjectType()
], HistoryEntry);
let Item = class Item {
};
__decorate([
    type_graphql_1.Field(() => String),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Item.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, lowercase: true, index: true }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({
        required: true,
        lowercase: true,
        default: 'unassigned',
        index: true
    }),
    __metadata("design:type", String)
], Item.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, lowercase: true, index: true }),
    __metadata("design:type", String)
], Item.prototype, "department", void 0);
__decorate([
    type_graphql_1.Field(() => [HistoryEntry]),
    typegoose_1.prop({ required: true, default: [] }),
    __metadata("design:type", Array)
], Item.prototype, "history", void 0);
Item = __decorate([
    type_graphql_1.ObjectType()
], Item);
exports.Item = Item;
exports.ItemModel = typegoose_1.getModelForClass(Item);
//# sourceMappingURL=Item.js.map