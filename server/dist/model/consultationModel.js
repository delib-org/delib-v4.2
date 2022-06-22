"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../Controls/helpers/general");
class Question {
    constructor({ id, name }) {
        this.rank = 0;
        this.id = id || (0, general_1.uid)();
        this.name = name;
    }
}
class Info {
    constructor({ id, name, description, link }) {
        this.rank = 0;
        this.id = id || (0, general_1.uid)();
        this.name = name;
        this.description = description;
        this.link = link;
    }
}
class Interest {
    constructor({ id, name, description, sharers }) {
        this.rank = 0;
        try {
            this.id = id || (0, general_1.uid)();
            this.name = name;
            this.description = description;
            this.sharers = sharers;
        }
        catch (error) {
            console.error(error);
        }
    }
}
class Consultation {
    constructor({ id, name, description, teams, stakeholders, parentes }) {
        this.options = [];
        this.question = []; //what is the question of the consultation? the most ranked, will be the question.
        this.info = [];
        this.interests = [];
        this.acceptences = [];
        this.conclusions = [];
        try {
            if (!name)
                throw new Error('Consultation name is required');
            if (!description)
                throw new Error('Consultation description is required');
            if (!parentes && !Array.isArray(parentes))
                throw new Error('Consultation parentes is required');
            this.id = id || (0, general_1.uid)();
            this.name = name;
            this.description = description;
            this.teams = teams || [];
            this.parentes = parentes || [];
            this.stakeholders = stakeholders || [];
        }
        catch (error) {
            console.error(error);
        }
    }
    addOption(option) {
        this.options.push(option);
    }
}
exports.default = Consultation;
//# sourceMappingURL=consultationModel.js.map