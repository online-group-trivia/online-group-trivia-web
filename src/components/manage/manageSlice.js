import { createSlice } from "@reduxjs/toolkit";

export const manageSlice = createSlice({
  name: "manage",
  initialState: {
    questions: [],
    title: "",
    gameId: undefined,
  },
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    removeQuestion: (state, action) => {
      let tempSet = new Set(state.questions);
      tempSet.delete(action.payload);
      state.questions = [...tempSet];
    },
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
    setInitialState: (state, action) => {
      state.questions = action.payload.questions;
      state.gameId = action.payload.gameId;
      state.title = action.payload.title;
    },
  },
});

export const {
  addQuestion,
  removeQuestion,
  changeTitle,
  setGameId,
  setInitialState,
} = manageSlice.actions;
export const selectQuestions = (state) => state.manage.questions;
export const selectTitle = (state) => state.manage.title;
export const selectgameId = (state) => state.manage.gameId;
export default manageSlice.reducer;
