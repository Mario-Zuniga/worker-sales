import { combineReducers } from "redux";
import storeWorkersReducer from "./storeWorkersReducer";
import themeReducer from "./themeReducer";

export default combineReducers({
  theme: themeReducer,
  workers: storeWorkersReducer,
});
