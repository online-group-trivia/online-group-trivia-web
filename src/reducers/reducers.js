import { createAction, createReducer } from "@reduxjs/toolkit";

export const addQuestion = createAction("manage/addQuestion");
export const removeQuestion = createAction("manage/removeQuestion");
export const changeTitle = createAction("manage/changeTitle");
export const setInitialState = createAction("manage/setInitialState");

const initialState = {
  questions: [],
  title: "",
  gameId: undefined,
};

export const manageReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addQuestion, (state, action) => {
      state.questions.push(action.payload);
    })
    .addCase(removeQuestion, (state, action) => {
      let tempSet = new Set(state.questions);
      tempSet.delete(action.payload);
      state.questions = [...tempSet];
    })
    .addCase(changeTitle, (state, action) => {
      state.title = action.payload;
    })
    .addCase(setInitialState, (state, action) => {
      state.questions = action.payload.questions;
      state.gameId = action.payload.gameId;
      state.title = action.payload.title;
    });
});

export function startGameAxios(gameId) {
  return {
    type: "manage/startGame",
    payload: {
      request: {
        method: "POST",
        data: `"${gameId}"`,
        url: "/start",
        headers: { "Content-Type": "application/json" },
      },
    },
    onSuccess: () => console.log("success!"),
  };
}

export const selectQuestions = (state) => state.questions;
export const selectTitle = (state) => state.title;
export const selectgameId = (state) => state.gameId;

export default manageReducer;
