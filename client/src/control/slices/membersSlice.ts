import Joi from "joi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConsultationProps,
  ConsultationValidation,
  ConsultationsValidation,
} from "../../model/consultationModelC";
import { reomveFromArray, updateArray } from "../helpers";
import { UserProps } from "./userSlice";

import { userValidate } from "./userSlice";
import { Role } from "../../model/role";

export interface Membership{
  memberId:string;
  user:UserProps;
  groupId:string;
  role:Role
}

export const membershipValidation = Joi.object({
  _id:Joi.string(),
  __v:Joi.number(),
  memberId:Joi.string().required(),
  user:userValidate,
  groupId:Joi.string().required(),
  role:Joi.string().valid('member','creator','admin')
})

export enum MembershipStatus {
  WAITING = "waiting",
  APPROVED = "approved",
  BANNED = "banned",
}

export interface MembershipPending {
  grpupId: string;
  user: UserProps;
  status: MembershipStatus;
  id:string;
}

const pendingValidation = Joi.object({
  _id:Joi.string(),
  __v:Joi.number(),
  groupId: Joi.string().required(),
  id: Joi.string().required(),
  user: userValidate,
  status: Joi.string().required(),
});
export const pendingsValidate = Joi.array().items(pendingValidation)
export const membershipsValidate = Joi.array().items(membershipValidation)


export interface ConsultationsState {
  pendings: Array<MembershipPending>;
  members:Array<Membership>;
}

const initialState: ConsultationsState = {
  pendings: [],
  members:[]
};

export const membersSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    updatePendings: (state, action: PayloadAction<MembershipPending[]>) => {
      try {
        console.log(action.payload)
        const { value, error } = pendingsValidate.validate(
          action.payload
        );

        if (!value || error) throw error;

        const membershipsPending: MembershipPending[] = action.payload;
        membershipsPending.forEach(membershipPending => {

          state.pendings = updateArray(state.pendings, membershipPending);
        });

       
      } catch (error) {
        console.error(error)
      }
    },
    updateMemberships:(state, action: PayloadAction<{memberships:Membership[],pending: MembershipPending}>) =>{
      try {
        console.log(action.payload)
        const {  error } = membershipsValidate.validate(
          action.payload.memberships
        );

        if ( error) throw error;

        const {memberships, pending} = action.payload;
        if(!memberships) throw new Error('No memberships')
        memberships.forEach(membership => {
          console.log(membership)
          state.members = updateArray(state.members, membership);
          if(pending) state.pendings = reomveFromArray(state.pendings,pending)
        });

       
      } catch (error) {
        console.error(error)
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { updatePendings,updateMemberships} =
membersSlice.actions;

export default membersSlice.reducer;

