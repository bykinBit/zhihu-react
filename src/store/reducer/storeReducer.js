import * as TYPES from "@/store/action-types";
const inital = {
  storeList: null,
};

export default function storeReducer(state = inital, action) {
  state = { ...state };
  switch (action.type) {
    case TYPES.STORE_LIST:
      state.storeList = action.storeList;
      break;
    case TYPES.STORE_REMOVE:
      if (Array.isArray(state.storeList)) {
        state.storeList = state.storeList.filter(
          (item) => item.id !== action.id
        );
      }
      break;
    default:
  }
  return state;
}
