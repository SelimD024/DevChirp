// Main.jsx

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App.jsx";
import CSharpCommunity from "./communities/CSharp.jsx";
import JavascriptCommunity from "./communities/Javascript.jsx";
import NewPostPage from "./components/NewPostPage.jsx"; // Nieuw bestand voor de nieuwe postpagina
import Login from "./components/LoginPage.jsx";
import CardDetails from "./components/CardDetails.jsx"; // Nieuw bestand voor kaartdetails

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
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/:community/new">
          <NewPostPage />
        </Route>
        <Route exact path="/card/:community/:id">
          {" "}
          {/* Dynamische route voor kaartdetails */}
          <CardDetails />
        </Route>
        <Route exact path="*">
          <p>Not found</p>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
