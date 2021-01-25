import React from "react";
import "./HomeComponent.css";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";

function HomeComponent(props) {
  const history = useHistory();
  const createGame = () => {
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
        let id = data["_id"];
        console.log(id);
        history.push(`/manage?gameId=${id}`);
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
        <Row className="justify-content-center p-3">
          <Form.Group as={Col} sm={4}>
            <Form.Control type="text" placeholder="Room ID" name="game id" />
            <br />
            <Form.Control
              type="text"
              placeholder="Your Nickname"
              name="nickname"
            />
          </Form.Group>
          {/* <Col sm className="my-auto p-3">
            <Button variant="primary" block>
              Connect
            </Button>
          </Col> */}
        </Row>
        <Row className="justify-content-center">
          <Col sm={2}>
            <Button variant="primary" block>
              Join a Room
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={3}>
            <Button variant="yardena" block onClick={createGame}>
              or, Create a New Game
            </Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  );
}

export default HomeComponent;
