import Entitiy from './entityModel';
import Option from './optionsModel';
import Team from './teamModel';
import User from './userModel';
interface ConsultationProps {
    id: string;
    name: string;
    description: string;
    stakeholders: User[];
    teams: Array<Team>;
    parentes: Array<{
        id: string;
        entitiy: Entitiy;
    }>;
}
declare class Question {
    id: string;
    name: string;
    rank: number;
    constructor({ id, name }: {
        id: any;
        name: any;
    });
}
declare class Info {
    id: string;
    name: string;
    description: string;
    link: string;
    rank: number;
    constructor({ id, name, description, link }: {
        id: any;
        name: any;
        description: any;
        link: any;
    });
}
declare class Interest {
    id: string;
    name: string;
    description: string;
    sharers: User[];
    rank: number;
    constructor({ id, name, description, sharers }: {
        id: any;
        name: any;
        description: any;
        sharers: any;
    });
}
declare class Consultation {
    id: string;
    name: string;
    description: string;
    teams: Array<Team>;
    stakeholders: Array<User>;
    parentes: Array<{
        id: string;
        entitiy: Entitiy;
    }>;
    options: Array<Option>;
    question: Array<Question>;
    info: Array<Info>;
    interests: Array<Interest>;
    acceptences: Array<Option>;
    conclusions: Array<Option>;
    constructor({ id, name, description, teams, stakeholders, parentes }: ConsultationProps);
    addOption(option: Option): void;
}
export default Consultation;
