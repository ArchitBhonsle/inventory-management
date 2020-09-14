"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUsername = exports.isEmail = void 0;
function isEmail(value) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(value);
}
exports.isEmail = isEmail;
function isUsername(value) {
    const re = /^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/;
    return re.test(value);
}
exports.isUsername = isUsername;
//# sourceMappingURL=validation.js.map