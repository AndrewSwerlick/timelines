import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { theme } from "./app/theme";
import { ThemeProvider } from "theme-ui";

import * as serviceWorker from "./serviceWorker";
import "./fonts/Virgil.woff2";
import { createNewTimeline } from "./entities/timeline";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

const timelineId = uuidv4();
store.dispatch(createNewTimeline({ id: timelineId }));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
