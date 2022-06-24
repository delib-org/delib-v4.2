import mongoose from "mongoose";
import { uid } from "../controls/helpers/general";

export interface UserProps{
     id: number;
     name: string;
     email: string;
     created_at: Date;
     updated_at: Date;
     given_name:string;
     family_name:string;
     picture:string;
     sub:string;
}

export class User {
    public id: number;
    public name: string;
    public email: string;
    public created_at: Date;
    public updated_at: Date;
    
    constructor ({id, name, email}) {
        this.id = id || uid();
        this.name = name;
        this.email = email;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}


export const UserSchema = new mongoose.Schema({
    name:String,
    given_name:String,
    family_name:String,
    email_verified:Boolean,
    email:String,
    created_at:Date,
    update_at:Date,
    googleUid:String,
    picture:String,
    sub:String,
    last_enter:Date
})

const UserModel = mongoose.model('users', UserSchema);


export default UserModel;