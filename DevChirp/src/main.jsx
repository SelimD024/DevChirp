import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { initFirebase } from "../firebase/firebase.ts";
import App, { communityData } from "./App.jsx";
import PostDetail from "./components/PostDetail.jsx";
import ProfileSettings from "./ProfileSettings.jsx";
import Login from "./components/LoginPage.jsx";
import Community from "./communities/Community";

initFirebase(); 

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/posts/:postId" component={PostDetail} />
        <Route exact path="/settings" component={ProfileSettings} />
        <Route exact path="/login" component={Login} />
        {communityData.map((community, index) => (
          <Route
            exact
            path={community.path}
            key={index}
            render={(props) => (
              <Community {...props} name={community.name} /> 
            )}
          />
        ))}
        <Route exact path="*" component={() => <p>Not found</p>} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
