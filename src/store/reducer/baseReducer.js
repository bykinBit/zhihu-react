import * as TYPES from "@/store/action-types";
const inital = {
  info: null,
  newsList: [],
};

export default function baseReducer(state = inital, action) {
  state = { ...state };
  switch (action.type) {
    case TYPES.BASE_INFO:
      state.info = action.info;
      break;
    case TYPES.NEWS_LIST:
      state.newsList = action.list;
      break;
    default:
  }
  return state;
}
