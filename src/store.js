import { configureStore } from "@reduxjs/toolkit";
import manageReducer from "./components/manage/manageSlice";

export default configureStore({
  reducer: {
    manage: manageReducer,
  },
});
