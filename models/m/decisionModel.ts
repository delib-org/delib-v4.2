import Entitiy from './entityModel';
import Option from './optionsModel';
import Team from './teamModel';
import User from './usersModel';

interface DecisionProps{
    id?: string;
    name: string;
    description: string;
    teams:Array<Team>;
    users:Array<User>;
    parentes:Array<{
        id:string,
        entitiy:Entitiy
    }>
}

class Decision{
    id: string;
    name: string;
    description: string;
    teams: Array<Team>;
    users:Array<User>;
    parentes:Array<{
        id:string,
        entitiy:Entitiy
    }>
    options:Array<Option> = [];


    constructor(props:DecisionProps){
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.teams = props.teams
        this.parentes = props.parentes;
        this.users = props.users;
    }

    addOption(option:Option){
        this.options.push(option);
    }
}

export default Decision;