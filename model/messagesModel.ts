import mongoose from "mongoose";
import { uid } from "../controls/helpers/general";

export const MessageSchema = new mongoose.Schema({
    message:String,
    creator:{
        name:String,
        picture:String,  
        sub:String
    },
    created_at:Date,
    consultationId:String
    
})

const MessageModel = mongoose.model('messages', MessageSchema);


export default MessageModel;