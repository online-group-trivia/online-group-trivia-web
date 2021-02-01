import { configureStore } from "@reduxjs/toolkit";

import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import manageReducer from "./reducers/reducers";

const client = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOSTNAME,
});

export default configureStore({
  reducer: manageReducer,
  middleware: [axiosMiddleware(client)],
});
