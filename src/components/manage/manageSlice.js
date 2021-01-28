import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const manageSlice = createSlice({
  name: "manage",
  initialState: {
    questions: [],
    title: "",
    gameId: undefined,
  },
  reducers: {
    addQuestion: (state, action) => {
      let tempSet = new Set(state.questions);
      if (!tempSet.has(action.payload)) {
        saveOnServer(
          {
            AddQuestion: {
              question: action.payload,
            },
          },
          state.gameId
        );
      }

      tempSet.add(action.payload);
      state.questions = [...new Set(state.questions).add(action.payload)];
    },
    removeQuestion: (state, action) => {
      saveOnServer(
        {
          RemoveQuestion: {
            question: action.payload,
          },
        },
        state.gameId
      );

      let tempSet = new Set(state.questions);
      tempSet.delete(action.payload);
      state.questions = [...tempSet];
    },
    changeTitle: (state, action) => {
      saveOnServer(
        {
          ChangeTitle: {
            title: action.payload,
          },
        },
        state.gameId
      );
      state.title = action.payload;
    },
    setInitialState: (state, action) => {
      state.questions = action.payload.questions;
      state.gameId = action.payload.gameId;
      state.title = action.payload.title;
    },
  },
});

async function saveOnServer(data, gameId) {
  await axios.put(
    `${process.env.REACT_APP_BACKEND_HOSTNAME}/save?gameId=${gameId}`,
    data
  );
}

export const {
  addQuestion,
  removeQuestion,
  changeTitle,
  setGameId,
  setInitialState,
} = manageSlice.actions;
export const selectQuestions = (state) => state.manage.questions;
export const selectTitle = (state) => state.manage.title;
export default manageSlice.reducer;
