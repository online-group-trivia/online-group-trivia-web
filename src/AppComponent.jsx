import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomeComponent from "./components/HomeComponent";
import GameComponent from "./components/GameComponent";
import ManageComponent from "./components/ManageComponent";

class AppComponent extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeComponent />
          </Route>
          <Route path="/manage">
            <ManageComponent />
          </Route>
          <Route path="/play">
            <GameComponent />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default AppComponent;
