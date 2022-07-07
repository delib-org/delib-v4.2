import Joi from 'joi';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSchema } from "../../model/userModelC";
export interface UserProps {
  name: string;
  sub: string;
  picture: string;
}

export const userValidate = Joi.object({
  name:Joi.string().required(),
  sub:Joi.string().required(),
  picture:Joi.string().required()
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
