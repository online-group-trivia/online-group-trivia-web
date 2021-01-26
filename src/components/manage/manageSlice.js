import { createSlice } from "@reduxjs/toolkit";

export const manageSlice = createSlice({
  name: "manage",
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      const index = state.questions.indexOf(action.payload);
      if (index > -1) {
        state.questions.splice(index, 1);
      }
    },
  },
});

export const { addQuestion, removeQuestion } = manageSlice.actions;
export const selectQuestions = (state) => state.manage.questions;
export default manageSlice.reducer;
