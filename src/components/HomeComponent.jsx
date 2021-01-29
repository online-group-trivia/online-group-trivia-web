import React from "react";
import "./HomeComponent.css";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";

function HomeComponent(props) {
  const [roomId, setRoomId] = useState("");
  const onRoomId = ({ target: { value } }) => setRoomId(value);
  const [displayName, setDisplayName] = useState("");
  const onDisplayName = ({ target: { value } }) => setDisplayName(value);
  const history = useHistory();
  const createGame = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOSTNAME}/create`, {
        title: "My new trivia game!",
      })
      .then((response) => {
        let id = response.data["_id"];
        console.log(id);
        history.push(`/manage?gameId=${id}`);
      });
  };

  function joinRoom() {
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOSTNAME}/join`, {
        id: roomId,
        displayName: displayName,
      })
      .then((response) => {
        console.log(response);
      });
  }

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
            <Form.Control
              type="text"
              placeholder="Room ID"
              name="game id"
              onChange={onRoomId}
            />
            <br />
            <Form.Control
              type="text"
              placeholder="Your Nickname"
              name="nickname"
              onChange={onDisplayName}
            />
          </Form.Group>
        </Row>
        <Row className="justify-content-center">
          <Col sm={2}>
            <Button variant="primary" block onClick={() => joinRoom()}>
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
