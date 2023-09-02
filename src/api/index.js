import http from "./http";
export const queryNewsLatest = () => http.get("/api/news_latest");

export const queryNewsBefore = (time) =>
  http.get("/api/news_before", { params: { time } });
export const queryNewsInfo = (id) =>
  http.get("/api/news_info", { params: { id } });

export const queryStoryExtra = (id) =>
  http.get("/api/story_extra", { params: { id } });
//发送验证码
export const sendPhoneCode = (phone) => http.post("/api/send_code", { phone });
//登录注册
export const login = (phone, code) => http.post("/api/login", { phone, code });
//获取用户信息
export const queryUserInfo = () => http.get("/api/user_info");

//获取收藏列表
export const queryStoreList = () => http.get("/api/store");

//收藏新闻
export const storeNews = (news) =>
  http.post("/api/store_news", { newsInfo: news });

//移除收藏
export const removeStore = (storeId) =>
  http.get("/api/store_remove", { params: { storeId } });

/** 图片上传 */
export const uploadImage = (file) => {
  let fm = new FormData();
  fm.append("avatar", file);
  return http.post("/api/upload", fm);
};
//修改个人信息
export const updateProfile = (username, avatar) =>
  http.post("/api/user_update", { username, avatar });
