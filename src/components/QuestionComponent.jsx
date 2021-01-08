import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1>
        <Badge variant="secondary">
          <Container fluid>
            <Row className="align-items-center">
              <Col className="text-wrap">{this.props.question}</Col>
              <Col sm={2}>
                <Button variant="danger" block>
                  X
                </Button>
              </Col>
            </Row>
          </Container>
        </Badge>
      </h1>
    );
  }
}

export default QuestionComponent;
