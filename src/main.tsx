import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scripts";

import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.scss";


ReactDOM.createRoot(document.getElementById("root")!).render(
  // Redux Toolkit Store defines a global state of the application
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);