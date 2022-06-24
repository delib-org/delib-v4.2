import Joi from 'joi';

export const UserSchema:any = Joi.object({
  name:Joi.string().required(),
  picture:Joi.string(),
  sub:Joi.string().required()
})