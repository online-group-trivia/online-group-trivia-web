import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import homeReducer from "./reducers/homeReducer";

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOSTNAME,
});

export default configureStore({
  reducer: combineReducers({ home: homeReducer }),
  middleware: [axiosMiddleware(client)],
});
