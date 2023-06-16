import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App.jsx";
import CSharpCommunity from "./communities/CSharp.jsx";
import JavascriptCommunity from "./communities/Javascript.jsx";
import Login from "./components/LoginPage.jsx";
import "./index.css";
import { initFirebase } from "../firebase/firebase.ts";

initFirebase(); // Voer de initFirebase-functie uit

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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="*">
          <p>Not found</p>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
