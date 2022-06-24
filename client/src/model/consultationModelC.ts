import Joi from 'joi';

export interface ConsultationProps{
    _id?:string;
    name:string;
    description:string;
}

export const ConsultationValidation = Joi.object({
    _id:Joi.string(),
    name:Joi.string().required(),
    description:Joi.string().required()
})

export const ConsultationsValidation = Joi.array().items(ConsultationValidation)