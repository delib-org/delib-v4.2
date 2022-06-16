import Entitiy from './entityModel';
import Option from './optionsModel';
import Team from './teamModel';

interface DecisionProps{
    id: string;
    name: string;
    description: string;
    team: Team;
    parentes:Array<{
        id:string,
        entitiy:Entitiy
    }>
}

class Decision{
    id: string;
    name: string;
    description: string;
    team: Team;
    parentes:Array<{
        id:string,
        entitiy:Entitiy
    }>
    options:Array<Option> = [];


    constructor(props:DecisionProps){
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.team = props.team;
        this.parentes = props.parentes;
    }

    addOption(option:Option){
        this.options.push(option);
    }
}

export default Decision;