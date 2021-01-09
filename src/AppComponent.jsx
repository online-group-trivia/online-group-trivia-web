import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import GameComponent from "./components/GameComponent";
import ManageComponent from "./components/ManageComponent";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Inner(params) {
  let query = new URLSearchParams(useLocation().search);
  return (
    <Switch>
      <Route exact path="/">
        <HomeComponent />
      </Route>
      <Route path="/manage">
        <ManageComponent roomId={query.get("roomId")} />
      </Route>
      <Route path="/play">
        <GameComponent />
      </Route>
    </Switch>
  );
}
export default function AppComponent() {
  return (
    <Router>
      <Inner />
    </Router>
  );
}
