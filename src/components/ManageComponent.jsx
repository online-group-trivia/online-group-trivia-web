import React from "react";
import "./ManageComponent.css";
import QuestionComponent from "./QuestionComponent";
import AddQuestionComponent from "./AddQuestionComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("RoomId = " + props.roomId);

    this.state = {
      nextId: 1,
      gameTitle: "Untitled Game",
      questions: [],
      showToast: false,
    };

    this.SaveOnServer = this.SaveOnServer.bind(this);
    this.closeToast = this.closeToast.bind(this);
  }

  componentDidMount() {
    this.getRoomDataFromServer();
  }
  getRoomDataFromServer() {
    const myHeaders = new Headers({});
    const myRequest = new Request(
      `http://127.0.0.1:9631/manage?room_uuid=${this.props.roomId}`,
      {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
      }
    );

    fetch(myRequest)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const calculateNextId =
          Math.max(0, ...data["questions"].slice().map((q) => q.id)) + 1;
        this.setState({
          gameTitle: data["title"],
          questions: data["questions"],
          nextId: calculateNextId,
        });
      })
      .catch((err) => console.log(err));
  }

  saveRoomDataOnServer() {}

  // display form to fill questions
  // button to add the question
  // display the list of filled questions
  // set title for the game
  // save button ( option to save every 60 sec)
  // start the game option

  addQuestion(questionStr) {
    console.log("Got question: " + questionStr);
    let myQuestions = this.state.questions.slice();
    myQuestions.push({ question: questionStr, id: this.state.nextId });
    this.setState({ questions: myQuestions, nextId: this.state.nextId + 1 });
  }

  removeQuestion(id) {
    console.log("Removing question: " + id);
    let myQuestions = this.state.questions.slice();
    const index = myQuestions.map((q) => q.id).indexOf(id);
    if (index > -1) {
      myQuestions.splice(index, 1);
    }
    this.setState({ questions: myQuestions });
  }

  closeToast() {
    this.setState({ showToast: false });
  }

  SaveOnServer() {
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    const myRequest = new Request(
      `http://127.0.0.1:9631/save?room_uuid=${this.props.roomId}`,
      {
        method: "PUT",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
          title: this.state.title,
          questions: this.state.questions,
        }),
      }
    );

    fetch(myRequest).then(this.setState({ showToast: true }));
  }

  render() {
    const myQuestions = this.state.questions.slice().map((question, i) => {
      return (
        <QuestionComponent
          onRemoveQuestion={(id) => this.removeQuestion(id)}
          key={question.id}
          question={question}
        ></QuestionComponent>
      );
    });

    return (
      <Container>
        <Row>
          <Col>
            <h1>{this.state.gameTitle}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.SaveOnServer}>Save</Button>
            <Toast
              onClose={this.closeToast}
              show={this.state.showToast}
              delay={5000}
              autohide
            >
              <Toast.Body>Data saved!</Toast.Body>
            </Toast>
          </Col>
        </Row>
        <Row>
          <Col sm={7}>
            <AddQuestionComponent onAddQuestion={(q) => this.addQuestion(q)} />
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
