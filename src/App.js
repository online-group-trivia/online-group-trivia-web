import logo from "./rnm.png";
import sound from "./sound.mp3";
import "./App.css";
import React from "react";
// const TeamInfo = React.lazy(() => import("./TeamInfo"));
import TeamInfo from "./TeamInfo.js";
import ReactAudioPlayer from "react-audio-player";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the best game in the world!</h1>
          <iframe
            src={sound}
            allow="autoplay"
            style={{ display: "none" }}
          ></iframe>
        </header>
        <body className="App-body">
          <div class="container">
            <div class="row">
              <div class="col-sm">
                <TeamInfo players={["Eden", "Yardena"]}></TeamInfo>
              </div>
              <div class="col-sm">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <div class="col-sm">
                <TeamInfo players={["Dan", "Barak"]}></TeamInfo>
              </div>
            </div>
          </div>
        </body>
      </div>
    );
  }
}

export default App;
