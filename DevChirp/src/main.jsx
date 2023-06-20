import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CSharpCommunity from "./communities/CSharp.jsx";
import JavascriptCommunity from "./communities/Javascript.jsx";
import Login from "./components/LoginPage.jsx";
import "./index.css";
import App from "./App.jsx";
import PostDetail from "./components/PostDetail.jsx";
import ProfileSettings from "./ProfileSettings.jsx";

import { initFirebase } from "../firebase/firebase.ts";

initFirebase(); // Voer de initFirebase-functie uit

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/posts/:postId" component={PostDetail} />
        <Route exact path="/csharp">
          <CSharpCommunity />
        </Route>
        <Route exact path="/javascript">
          <JavascriptCommunity />
        </Route>
        <Route exact path="/settings">
          <ProfileSettings />
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
