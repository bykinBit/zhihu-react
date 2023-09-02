import React from "react";
import { HashRouter } from "react-router-dom";
import { KeepAliveProvider } from "keepalive-react-component";
import RouteView from "./router";
export default function App() {
  return (
    <HashRouter>
      <KeepAliveProvider>
        <RouteView />
      </KeepAliveProvider>
    </HashRouter>
  );
}
