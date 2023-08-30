import http from "./http";
export const queryNewsLatest = () => http.get("/api/news_latest");

export const queryNewsBefore = (time) =>
  http.get("/api/news_before", { params: { time } });
export const queryNewsInfo = (id) =>
  http.get("/api/news_info", { params: { id } });

export const queryStoryExtra = (id) =>
  http.get("/api/story_extra", { params: { id } });
