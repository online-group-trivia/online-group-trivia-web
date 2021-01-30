import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import manageReducer from "./reducers/reducers";

const client = axios.create({
  //all axios can be used, shown in axios documentation
  baseURL: process.env.REACT_APP_BACKEND_HOSTNAME,
});

export default configureStore({
  reducer: manageReducer,
  middleware: applyMiddleware(
    axiosMiddleware(client, { onSuccess: () => console.log("AAA") })
  ),
});
