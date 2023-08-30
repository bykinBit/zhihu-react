import React from "react";
import ReactDOM from "react-dom/client";
let root = ReactDOM.createRoot(document.getElementById("root"));
import store from "@/store";
import { ConfigProvider } from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import { Provider } from "react-redux";
import "lib-flexible";
import App from "./App";
import "./index.less";
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);
