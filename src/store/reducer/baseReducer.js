import * as TYPES from "@/store/action-types";
const inital = {
  info: null,
};

export default function baseReducer(state = inital, action) {
  state = { ...state };
  switch (action.type) {
    default:
  }
  return state;
}
