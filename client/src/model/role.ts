import Joi from "joi"

export enum Role{
    ADMIN = 'admin',
    MEMBER = 'member',
    CREATOR = 'creator',
    NONE = 'none',
    BANNED = 'banned'
}

export const RoleValidate = Joi.string().required().valid('admin','member','creator','none','banned')