import * as TYPE from "../action-types";
import { queryStoreList } from "@/api";

const storeAction = {
  //获取收藏列表
  async queryStoreListAsync() {
    let storeList = null;
    try {
      let { code, data } = await queryStoreList();
      if (+code === 0) {
        storeList = data;
      }
      return {
        type: TYPE.STORE_LIST,
        storeList,
      };
    } catch (error) {
      console.log(error);
      return {
        type: TYPE.STORE_LIST,
        storeList: null,
      };
    }
  },
  //清除存储的登录者信息
  clearStoreList() {
    return {
      type: TYPE.STORE_REMOVE,
      storeList: null,
    };
  },
  //删除收藏
  removeStoreItemById(id) {
    return {
      type: TYPE.STORE_REMOVE,
      id,
    };
  },
};
export default storeAction;
