import { createAction, createReducer } from "@reduxjs/toolkit";

export const createGameOnSuccess = createAction("home/createGame_SUCCESS");
export const getGameDataOnSuccess = createAction("home/getGameData_SUCCESS");
export const getGameDataOnFailure = createAction("home/getGameData_FAIL");
export const addQuestion = createAction("home/addQuestion");
export const removeQuestion = createAction("home/removeQuestion");
export const changeTitle = createAction("home/changeTitle");

const initialState = {
  hasData: false,
  questions: [],
  title: "",
  gameId: undefined,
  gameDataStatus: undefined,
};

export const storeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createGameOnSuccess, (state, action) => {
      let data = action.payload.data;
      console.log(data);
      state.questions = data.questions;
      state.title = data.title;
      state.gameId = data._id;
      state.hasData = true;
      state.gameDataStatus = "OK";
    })
    .addCase(getGameDataOnSuccess, (state, action) => {
      let data = action.payload.data;
      state.questions = data.questions;
      state.gameId = data._id;
      state.title = data.title;
      state.gameDataStatus = "OK";
      state.hasData = true;
    })
    .addCase(getGameDataOnFailure, (state, action) => {
      console.log(action);
      state.gameDataStatus = action.error.response.status;
      state.hasData = true;
    })
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
    });
});

export function createGameAxios(gameTitle) {
  return {
    type: "home/createGame",
    payload: {
      request: {
        method: "POST",
        data: {
          title: gameTitle,
        },
        url: "/create",
      },
    },
    onSuccess: () => console.log("success!"),
  };
}

export function startGameAxios(gameId) {
  return {
    type: "home/startGame",
    payload: {
      request: {
        method: "POST",
        data: `"${gameId}"`,
        url: "/start",
        headers: { "Content-Type": "application/json" },
      },
    },
  };
}

export function getGameDataAxios(gameId) {
  console.log(gameId);
  return {
    type: "home/getGameData",
    payload: {
      request: {
        method: "GET",
        url: "/manage?gameId=" + gameId,
      },
    },
  };
}

export default storeReducer;
