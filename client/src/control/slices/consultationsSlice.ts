
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSchema } from "../../model/userModelC";
export interface ConsultationsProps{

}
export interface ConsultationsState {
  consultations: Array<ConsultationsProps>;
}

const initialState: ConsultationsState = {
    consultations: []
};

export const consultationsSlice = createSlice({
  name: "consultations",
  initialState,
  reducers: {
    setConsultation: (state, action: PayloadAction<ConsultationsProps>) => {
      const { value } = UserSchema.validate(action.payload);
      if (value) {
        state.consultations = value;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConsultation } = consultationsSlice.actions;

export default consultationsSlice.reducer;