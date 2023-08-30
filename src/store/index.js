import { applyMiddleware, createStore } from "redux";
import reduxLogger from "redux-logger";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import reducer from "./reducer";

let middleware = [reduxThunk, reduxPromise];
if (process.env.NODE_ENV === "development") {
  middleware.push(reduxLogger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
