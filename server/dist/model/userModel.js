"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../Controls/helpers/general");
class User {
    constructor({ id, name, email }) {
        this.id = id || (0, general_1.uid)();
        this.name = name;
        this.email = email;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}
exports.default = User;
//# sourceMappingURL=userModel.js.map