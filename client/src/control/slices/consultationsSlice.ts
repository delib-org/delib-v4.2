
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConsultationProps,ConsultationValidation,ConsultationsValidation } from "../../model/consultationModelC";
import { updateArray } from "../helpers";

export interface ConsultationsState {
  consultations: Array<ConsultationProps>;
}

const initialState: ConsultationsState = {
    consultations: []
};

export const consultationsSlice = createSlice({
  name: "consultations",
  initialState,
  reducers: {
    setConsultation: (state, action: PayloadAction<ConsultationProps>) => {
      const { value } = ConsultationValidation.validate(action.payload);
     
      if (value) {
        const consultation:ConsultationProps = value; 

        state.consultations = updateArray(state.consultations,consultation);
      }
    },
    createConsultations:(state, action:PayloadAction<Array<ConsultationProps>>)=>{
      const {value} = ConsultationsValidation.validate(action.payload)
      if (value) {
        

        state.consultations = value;
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { setConsultation,createConsultations } = consultationsSlice.actions;

export default consultationsSlice.reducer;