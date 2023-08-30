import { combineReducers } from "redux";
import baseReducer from "./baseReducer";
import storeReducer from "./storeReducer";

const reducer = combineReducers({
  base: baseReducer,
  store: storeReducer,
});
export default reducer;
