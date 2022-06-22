"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../controls/helpers/general");
class Option {
    constructor(name, description, id) {
        this.preferencesAggragation = [];
        try {
            this.id = id || (0, general_1.uid)();
            this.name = name;
            this.description = description;
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = Option;
//# sourceMappingURL=optionsModel.js.map