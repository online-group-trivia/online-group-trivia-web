import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import GameComponent from "./components/GameComponent";
import ManageComponent from "./components/ManageComponent";

function Inner(params) {
  let query = new URLSearchParams(useLocation().search);
  return (
    <Switch>
      <Route exact path="/">
        <HomeComponent />
      </Route>
      <Route path="/manage">
        <ManageComponent gameId={query.get("gameId")} />
      </Route>
      <Route path="/play">
        <GameComponent />
      </Route>
    </Switch>
  );
}
export default function AppComponent() {
  return (
    <Router basename="/online-group-trivia-web">
      <Inner />
    </Router>
  );
}
