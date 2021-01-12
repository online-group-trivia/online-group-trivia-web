import "./LoadingScreenComponent.css";
import logo from "../assets/rnm.png";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
function LoadingScreenComponent(params) {
  return (
    <div className="ipl-progress-indicator" id="ipl-progress-indicator">
      <div className="ipl-progress-indicator-head">
        <div className="first-indicator"></div>
        <div className="second-indicator"></div>
      </div>
      <Jumbotron
        className="d-flex align-items-center min-vh-100"
        style={{ backgroundColor: "white" }}
      >
        <Container className="text-center">
          <div className="insp-logo-frame">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default LoadingScreenComponent;
