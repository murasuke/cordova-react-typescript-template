import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const startApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if ((window as any).cordova) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}
