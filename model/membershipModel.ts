import mongoose from 'mongoose';

const MembershipSchema = new mongoose.Schema({
    memberId:{
        type:String,
        required:true
    },
    groupId:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:['creator','admin','member'],
        default:'member'
    }
})

const MembershipModel = mongoose.model('memberships',MembershipSchema);

export default MembershipModel;