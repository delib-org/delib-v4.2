import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSchema } from "../../model/userModelC";
interface UserProps {
  name: string;
  sub: string;
  picture: string;
}

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
