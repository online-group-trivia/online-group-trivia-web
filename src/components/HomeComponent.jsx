import React from "react";
import "./HomeComponent.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function HomeComponent(props) {
  const history = useHistory();
  const createRoom = () => {
    const myHeaders = new Headers();
    const myRequest = new Request("http://127.0.0.1:9631/create", {
      method: "POST",
      headers: myHeaders,
      mode: "cors",
      cache: "default",
    });
    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        let id = data["room_uuid"];
        console.log(id);
        history.push(`/manage?roomId=${id}`);
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
