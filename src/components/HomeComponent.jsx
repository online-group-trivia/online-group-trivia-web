import React from "react";
import "./HomeComponent.css";
class HomeComponent extends React.Component {
  state = {};
  render() {
    return (
      <div class="jumbotron d-flex align-items-center min-vh-100">
        <div class="container text-center">
          <div class="row mb-4">
            <div class="col-sm">
              <h1>Welcome to Group Trivia!</h1>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-sm">
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Room ID"
              ></input>
            </div>
            <div class="col-sm">
              <div class="d-grid">
                <button type="button" class="btn btn-primary btn-block">
                  Connect
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col d-grid">
              <button type="button" class="btn btn-primary">
                or, Create a New Room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
