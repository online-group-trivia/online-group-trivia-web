import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Badge from "react-bootstrap/Badge";
import "./ParticipantsLobbyComponent.css";

class ParticipantsLobbyComponent extends React.Component {
  render() {
    let questions = ["hh1", "ty2", "3sfssfd"];
    const myQuestions = questions.slice().map((question) => {
      return (
        <h1>
          <Badge variant="secondary">
            <Container>
              <Row className="align-items-center">
                <Col>{question}</Col>
              </Row>
            </Container>
          </Badge>
        </h1>
      );
    });
    return (
      <Jumbotron className="white-background d-flex align-items-center min-vh-100 ">
        <Container className="text-center ">
          <Row>
            <Jumbotron
              fluid
              as={Col}
              className="flex"
              style={{
                "background-color": "#6495ED",
                height: "90vh",
              }}
            >
              <Container>
                <h1>Blue jumbotron</h1>
                <Col>{myQuestions}</Col>
              </Container>
            </Jumbotron>

            <Col lg={6} className="text-top">
              <h1>this is the question</h1>
            </Col>

            <Jumbotron
              fluid
              as={Col}
              className="flex"
              style={{ "background-color": "#FF5733", height: "90vh" }}
            >
              <Container>
                <h1>Red jumbotron</h1>
                <Col>{myQuestions}</Col>
              </Container>
            </Jumbotron>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}

export default ParticipantsLobbyComponent;
