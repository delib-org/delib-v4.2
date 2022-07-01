import mongoose from 'mongoose';

const MembershipSchema = new mongoose.Schema({
    memberId:String,
    teamId:String,
    role:{
        type:String,
        enum:['creator','admin','member'],
        default:'member'
    }
})

const MembershipModel = mongoose.model('memberships',MembershipSchema);

export default MembershipModel;