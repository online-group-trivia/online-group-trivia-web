import React from "react";
import "./HomeComponent.css";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

function HomeComponent(props) {
  const history = useHistory();
  const createRoom = () => {
    const myHeaders = new Headers({ "content-type": "application/json" });
    const myRequest = new Request(
      process.env.REACT_APP_BACKEND_HOSTNAME + "/create",
      {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({ title: "My new trivia game!" }),
      }
    );
    fetch(myRequest)
      .then((response) => response.json())
      .then((data) => {
        let id = data["id"];
        console.log(id);
        history.push(`/manage?roomId=${id}`);
      });
  };

  return (
    <Jumbotron className="white-background d-flex align-items-center min-vh-100">
      <Container className="text-center overflow-hidden">
        <Row mb={4}>
          <Col sm>
            <h1>Welcome to Group Trivia!</h1>
          </Col>
        </Row>
        <Row mb={2}>
          <Col sm>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Room ID"
            ></input>
          </Col>
          <Col sm>
            <Button variant="primary" block>
              Connect
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={createRoom}>
              or, Create a New Room
            </Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default HomeComponent;
