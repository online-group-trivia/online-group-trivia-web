import logo from "../assets/rnm.png";
import "./GameComponent.css";
import React from "react";
// const TeamInfo = React.lazy(() => import("./TeamInfo"));
import TeamInfo from "./TeamInfo.jsx";
class GameComponent extends React.Component {
  componentDidMount() {
    const myHeaders = new Headers();
    const myRequest = new Request(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita",
      {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
      }
    );

    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the best game in the world!</h1>
        </header>
        <body className="App-body">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <TeamInfo teamName={"Team A"} players={["Player 1", "Player 2"]}></TeamInfo>
              </div>
              <div class="col-sm">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <div class="col-sm">
                <TeamInfo teamName={"Team B"} players={["Player 3", "Player 4"]}></TeamInfo>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default GameComponent;
