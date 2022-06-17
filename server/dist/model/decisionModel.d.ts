import Entitiy from './entityModel';
import Option from './optionsModel';
import Team from './teamModel';
interface DecisionProps {
    id: string;
    name: string;
    description: string;
    team: Team;
    parentes: Array<{
        id: string;
        entitiy: Entitiy;
    }>;
}
declare class Decision {
    id: string;
    name: string;
    description: string;
    team: Team;
    parentes: Array<{
        id: string;
        entitiy: Entitiy;
    }>;
    options: Array<Option>;
    constructor(props: DecisionProps);
    addOption(option: Option): void;
}
export default Decision;
