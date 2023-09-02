import * as TYPE from "../action-types";
import { queryUserInfo } from "@/api";

const baseAction = {
  async queryUserInfoAsync() {
    let info = null;
    try {
      let { code, data } = await queryUserInfo();
      if (+code === 0) {
        info = data;
      }
      return {
        type: TYPE.BASE_INFO,
        info,
      };
    } catch (error) {
      console.log(error);
      return {
        type: TYPE.BASE_INFO,
        info: null,
      };
    }
  },
  saveNewsList(list) {
    return {
      type: TYPE.NEWS_LIST,
      list,
    };
  },
  //清楚存储的登录者信息
  clearUserInfo() {
    return {
      type: TYPE.BASE_INFO,
      info: null,
    };
  },
};
export default baseAction;
