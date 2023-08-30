import React from "react";
import { HashRouter } from "react-router-dom";
import RouteView from "./router";
export default function App() {
  return (
    <HashRouter>
      <RouteView />
    </HashRouter>
  );
}
