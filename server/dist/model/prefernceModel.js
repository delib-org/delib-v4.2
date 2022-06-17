"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//prefernce, is the prefernce of a user twoard some option.
const general_1 = require("../controls/helpers/general");
class Prefernce {
    constructor(userId, optionId, value, id) {
        this.id = this.id || (0, general_1.uid)();
        this.userId = userId;
        this.optionId = optionId;
        this.value = value;
    }
}
exports.default = Prefernce;
//# sourceMappingURL=prefernceModel.js.map