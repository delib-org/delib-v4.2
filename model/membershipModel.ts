import mongoose from "mongoose";
import Joi from "joi";
import { UserSchema } from "./userModel";

const MembershipSchema = new mongoose.Schema({
  memberId: {
    type: String,
    required: true,
  },
  user: {
    type: UserSchema,
    required: true,
  },
  groupId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["creator", "admin", "member", "none", "banned"],
    default: "member",
  },
});

export enum Role {
  MEMBER = "member",
  ADMIN = "admin",
  CREATOR = "creator",
  NONE = "none",
  BANNED = "banned",
}
export const RoleValidate = Joi.string().valid(
  "admin",
  "member",
  "creator",
  "none",
  "banned"
);

export interface Membership {
  memberId: string;
  groupId: string;
  role: Role;
}

const MembershipModel = mongoose.model("memberships", MembershipSchema);

export default MembershipModel;
