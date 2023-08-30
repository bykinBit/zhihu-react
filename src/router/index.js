import React, { Suspense } from "react";
import { Mask, DotLoading } from "antd-mobile";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import routes from "./routes";
function Element(props) {
  const { component: Component, meta } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [usp] = useSearchParams();
  document.title = meta.title;
  return (
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
