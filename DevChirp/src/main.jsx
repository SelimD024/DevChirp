// Main.jsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App.jsx";
import CSharpCommunity from "./components/communities/CSharpCommunity.jsx";
import JavascriptCommunity from "./components/communities/JavascriptCommunity.jsx";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/csharp">
          <CSharpCommunity />
        </Route>
        <Route exact path="/javascript">
          <JavascriptCommunity />
        </Route>
        <Route exact path="*">
          <p>Not found</p>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
