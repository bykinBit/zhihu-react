import qs from "qs";
import { Toast } from "antd-mobile";
function isPlainObj(obj) {
  return typeof obj !== null && !Array.isArray(obj) && typeof obj === "object";
}
export default function http(config) {
  if (!isPlainObj(config)) config = {};
  config = Object.assign({}, config);
  if (!config.url) throw new TypeError("url must be required!");
  if (!isPlainObj(config.headers)) config.headers = {};
  if (config.params !== null && !isPlainObj(config.params)) {
    config.params = null;
  }
  let {
    url,
    method,
    credentials,
    headers,
    body,
    params,
    responseType,
    signal,
  } = config;
  if (params) {
    url += `${url.includes("?") ? "&" : "?"}${qs.stringify(params)}`;
  }
  if (isPlainObj(body)) {
    body = qs.stringify(body);
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  let token = localStorage.getItem("tk");
  if (token) headers["authorization"] = token;

  method = method.toUpperCase();
  config = {};
  if (/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body;
  return fetch(url, config)
    .then((response) => {
      const { status, statusText } = response;
      if (/^(2|3)\d{2}/.test(status)) {
        let result;
        switch (response.type.toLowerCase()) {
          case "text":
            result = response.text();
            break;
          case "arrayBuffer":
            result = response.arrayBuffer();
            break;
          case "blob":
            result = response.blob();
            break;
          default:
            result = response.json();
            break;
        }
        return result;
      }
      return Promise.reject({
        code: -100,
        status,
        statusText,
      });
    })
    .catch((reason) => {
      Toast.show({ icon: "fail", content: "网络异常，请稍后重试～" });
      return Promise.reject(reason);
    });
}

["GET", "HEAD", "DELETE", "OPTIONS"].forEach((item) => {
  http[item.toLowerCase()] = function (url, config) {
    if (!isPlainObj(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    return http(config);
  };
});
["POST", "PUT", "PATCH"].forEach((item) => {
  http[item.toLowerCase()] = function (url, body, config) {
    if (!isPlainObj(config)) config = {};
    config["url"] = url;
    config["method"] = item;
    config["body"] = body;
    return http(config);
  };
});
