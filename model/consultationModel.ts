import mongoose from 'mongoose';
import {uid} from "../controls/helpers/general";
import Joi from 'joi';






import Entitiy from './entityModel';
import Option from './optionsModel';
import Team from './teamModel';
import {User} from './userModel';

interface ConsultationProps{
    id: string;
    name: string;
    description: string;
    stakeholders: User[];
    teams: Array<Team>;
    img:string;
    parentes:Array<{
        id:string,
        entitiy:Entitiy
    }>
}

export const ConsultationSchema = new mongoose.Schema({
    name:String,
    description:String
})

export const ConsulationModel = mongoose.model('consultations', ConsultationSchema)

export const ConsultationValidation = Joi.object({
    _id:Joi.string(),
    name:Joi.string().required(),
    description:Joi.string().required()
})

class Question{
    public id: string;
    public name: string;
    public rank: number = 0;

    constructor({id, name}){
        this.id = id || uid();
        this.name = name;
    }
}
class Info{
    public id: string;
    public name: string;
    public description: string;
    public link: string;
    public rank: number = 0;
    constructor({id, name, description, link}){
        this.id = id || uid();
        this.name = name;
        this.description = description;
        this.link = link;
    }
}
class Interest{
    public id: string;
    public name: string;
    public description: string;
    public sharers: User[];
    public rank: number = 0;
    constructor({id, name, description, sharers}){
        try {
            this.id = id || uid();
            this.name = name;
            this.description = description;
            this.sharers = sharers;
        } catch (error) {
            console.error(error);
        }
       
    }
}

class Consultation{
    id: string;
    name: string;
    description: string;
    teams:Array<Team>;
    stakeholders:Array<User>;
    parentes:Array<{
        id:string,
        entitiy:Entitiy
    }>
    options:Array<Option> = [];
    question:Array<Question> = []; //what is the question of the consultation? the most ranked, will be the question.
    info:Array<Info> = [];
    interests:Array<Interest> = [];
    acceptences:Array<Option> = [];
    conclusions:Array<Option> = [];


    constructor({id, name, description, teams, stakeholders, parentes}:ConsultationProps){
        try {
            if(!name) throw new Error('Consultation name is required');
            if(!description) throw new Error('Consultation description is required');
            if(!parentes && !Array.isArray(parentes)) throw new Error('Consultation parentes is required');

            this.id = id || uid();
            this.name = name;
            this.description = description;
            this.teams = teams || [];
            this.parentes = parentes || [];
            this.stakeholders = stakeholders || [];
        } catch (error) {
            console.error(error);
        }
       
    }

    addOption(option:Option){
        this.options.push(option);
    }
}

export default Consultation;