import Joi from "joi";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ConsultationProps,
  ConsultationValidation,
  ConsultationsValidation,
} from "../../model/consultationModelC";
import { updateArray } from "../helpers";
import { UserProps } from "./userSlice";

import { userValidate } from "./userSlice";

export enum MembershipStatus {
  WAITING = "waiting",
  APPROVED = "approved",
  BANNED = "banned",
}

export interface MembershipPending {
  grpupId: string;
  user: UserProps;
  status: MembershipStatus;
}

export const membershipPendingValidate = Joi.object({
  grpupId: Joi.string().required(),
  user: userValidate,
  status: Joi.string().required(),
});

export interface ConsultationsState {
  pending: Array<MembershipPending>;
}

const initialState: ConsultationsState = {
  pending: [],
};

export const consultationsSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    updatePendings: (state, action: PayloadAction<ConsultationProps>) => {
      try {
        const { value, error } = membershipPendingValidate.validate(
          action.payload
        );

        if (!value || error) throw error;

        const membershipPending: MembershipPending = value;

        state.pending = updateArray(state.pending, membershipPending);
      } catch (error) {
        console.error(error)
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { updatePendings } =
  consultationsSlice.actions;

export default consultationsSlice.reducer;
