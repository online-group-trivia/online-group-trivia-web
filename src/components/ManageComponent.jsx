import React from "react";
import "./ManageComponent.css";
import QuestionComponent from "./QuestionComponent";
import AddQuestionComponent from "./AddQuestionComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTitle: "",
      roomUUid: "",
      questions: [
        "Is your Refrigerator running?",
        "how much money for a pizza?",
        "this is a very huge question so i write lost of text bla bla?",
      ],
    };
  }
  // display form to fill questions
  // button to add the question
  // display the list of filled questions
  // set title for the game
  // save button ( option to save every 60 sec)
  // start the game option

  addQuestion(questionStr) {
    // let myQuestions = this.state.questions.slice();
    // myQuestions.push(questionStr)
  }

  render() {
    // let myQuestions = this.state.questions.slice();

    const myQuestions = this.state.questions.slice().map((question, i) => {
      return <QuestionComponent question={question}></QuestionComponent>;
    });

    return (
      <Container>
        <Row>
          <Col>
            {/* need to add an option to change the text */}
            <h1>Untitled Game</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={7}>
            <AddQuestionComponent></AddQuestionComponent>
          </Col>
          <Col sm={5}>
            <ol>{myQuestions}</ol>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ManageComponent;
