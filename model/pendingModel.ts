import { string } from "joi";
import mongoose from "mongoose";
import { UserSchema } from "./userModel";

const PendingSchema = new mongoose.Schema({
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
        enum:['approved','waiting','banned'],
        default:'waiting'
    }
})

const PendingModel = mongoose.model('pendings',PendingSchema);
export default PendingModel;