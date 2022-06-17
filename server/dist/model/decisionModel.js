"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Decision {
    constructor(props) {
        this.options = [];
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.team = props.team;
        this.parentes = props.parentes;
    }
    addOption(option) {
        this.options.push(option);
    }
}
exports.default = Decision;
//# sourceMappingURL=decisionModel.js.map