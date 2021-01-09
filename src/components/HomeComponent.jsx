import React from "react";
import "./HomeComponent.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function HomeComponent(props) {
  const history = useHistory();
  const createRoom = () => {
    fetch("https://mockend.com/aedeny/online-group-trivia-web/posts/1")
      .then()
      .then((response) => response.json())
      .then((data) => {
        let id = data["roomUuid"];
        console.log(id);
        history.push(`/manage?roomUuid=${id}`);
      });
  };

  return (
    <div className="jumbotron d-flex align-items-center min-vh-100">
      <div className="container text-center">
        <div className="row mb-4">
          <div className="col-sm">
            <h1>Welcome to Group Trivia!</h1>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-sm">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Room ID"
            ></input>
          </div>
          <div className="col-sm">
            <div className="d-grid">
              <button type="button" className="btn btn-primary btn-block">
                Connect
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-grid">
            <button
              type="button"
              className="btn btn-primary"
              onClick={createRoom}
            >
              or, Create a New Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
