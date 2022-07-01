import { string } from "joi";
import mongoose from "mongoose";
import { UserSchema } from "./userModel";

const AskToJoinSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true
    },
    user:{
        type:UserSchema,
        required:true
    },
    groupId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['approved','waiting','rejected'],
        default:'waiting'
    }
})

const AskToJoinModel = mongoose.model('asks',AskToJoinSchema);
export default AskToJoinModel;