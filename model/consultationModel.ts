import mongoose from 'mongoose';
import {uid} from "../controls/helpers/general";
import Joi from 'joi';
import {UserSchema} from '../model/userModel';






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

export const RoleSchema = new mongoose.Schema({
    value:{
        type:String,
        enum:['creator', 'admin', 'member'],
        default:'member'
    }
})
export const GroupTypeSchema = new mongoose.Schema({
    value:{
        type:String,
        enum:['public', 'close', 'secret'],
        default:'public'
    }
})

export enum GroupeType{
    PUBLIC = 'public',
    CLOSE = 'close',
    SECRET = 'secret'
}

export const ConsultationSchema = new mongoose.Schema({
    name:String,
    description:String,
    creator:UserSchema,
    info:{
        text:String,
        read:[RoleSchema], //[member, admin, creator]
        write:[RoleSchema],//[member, admin, creator]
    },
    type:GroupTypeSchema

})

export const ConsulationModel = mongoose.model('consultations', ConsultationSchema)

export const ConsultationValidation = Joi.object({
    _id:Joi.string(),
    name:Joi.string().required(),
    description:Joi.string().required(),
    creator:Joi.object()
})



export default ConsulationModel;