import React, { Suspense, useEffect, useState } from "react";
import { Mask, DotLoading, Toast } from "antd-mobile";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import routes from "./routes";
import store from "@/store";
import action from "@/store/action";
function Element(props) {
  const { component: Component, meta, path } = props;
  const needTokenCom = ["/personal", "/store", "/update"];
  let {
    base: { info },
  } = store.getState();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [usp] = useSearchParams();
  document.title = meta.title;
  const [_, setRandomNum] = useState(0);
  let isShowMask = needTokenCom.includes(path) && !info;
  useEffect(() => {
    if (isShowMask) {
      (async () => {
        let baseAction = await action.base.queryUserInfoAsync();
        if (!baseAction?.info) {
          Toast.show({
            icon: "fail",
            content: "请先登录/注册!",
          });
          navigate({
            pathname: "/login",
            search: `?to=${path}`,
          });
          return;
        }
        info = baseAction.info;
        store.dispatch(baseAction);
        setRandomNum(+Date.now());
      })();
    }
  });
  return isShowMask ? (
    <Mask visible={true}>
      <DotLoading color="white" />
    </Mask>
  ) : (
    <Component
      navigate={navigate}
      location={location}
      params={params}
      usp={usp}
    />
  );
}

export default function RouteView() {
  return (
    <Suspense
      fallback={
        <Mask visible={true}>
          <DotLoading color="white" />
        </Mask>
      }
    >
      <Routes>
        {routes.map((item) => {
          let { name, path } = item;
          return (
            <Route key={name} path={path} element={<Element {...item} />} />
          );
        })}
      </Routes>
    </Suspense>
  );
}
