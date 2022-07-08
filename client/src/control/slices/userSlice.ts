import Joi from 'joi';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSchema } from "../../model/userModelC";
export interface UserProps {
  name: string;
  sub: string;
  picture: string;
  email?:string,
  family_name?:string,
  given_name?:string,
  last_enter?:Date
}

export const userValidate = Joi.object({
  _id:Joi.string(),
  __v:Joi.number(),
  name:Joi.string().required(),
  sub:Joi.string().required(),
  picture:Joi.string().required(),
  email:Joi.string(),
  family_name:Joi.string(),
  given_name:Joi.string(),
  last_enter:Joi.date()

})

export interface UserState {
  user: UserProps | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<UserProps>) => {
      const { value } = UserSchema.validate(action.payload);
      if (value) {
        state.user = value;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin } = userSlice.actions;

export default userSlice.reducer;
