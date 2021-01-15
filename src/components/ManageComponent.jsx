import React from "react";
import "./ManageComponent.css";
import QuestionComponent from "./QuestionComponent";
import AddQuestionComponent from "./AddQuestionComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreenComponent from "./LoadingScreenComponent";
import ServerErrorMessageComponent from "./ServerErrorMessageComponent";
import EditableLabel from "react-inline-editing";

class ManageComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("RoomId = " + props.roomId);

    this.state = {
      nextId: 1,
      showToast: false,
    };

    this.SaveOnServer = this.SaveOnServer.bind(this);
    this.closeToast = this.closeToast.bind(this);
    this.handleFocusOut = this.handleFocusOut.bind(this);
  }

  handleFocusOut(text) {
    this.setState({ gameTitle: text }, () => this.SaveOnServer());
    console.log("Left editor with text: " + text);
  }

  componentDidMount() {
    this.getRoomDataFromServer();
  }
  getRoomDataFromServer() {
    const myHeaders = new Headers({});
    const myRequest = new Request(
      `${process.env.REACT_APP_BACKEND_HOSTNAME}/manage?room_uuid=${this.props.roomId}`,
      {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
      }
    );

    fetch(myRequest)
      .then((response) => {
        if (!response.ok) {
          this.setState({ requestStatus: response.status });
          return;
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data === undefined) {
          return;
        }
        console.log(data);
        const calculateNextId =
          Math.max(0, ...data["questions"].slice().map((q) => q.id)) + 1;
        this.setState({
          gameTitle: data["title"],
          questions: data["questions"],
          nextId: calculateNextId,
          requestStatus: "OK",
        });
        document.title = "Group Trivia | " + this.state.gameTitle;
      })
      .catch((err) => {
        this.setState({ requestStatus: "Server unreachable" });
        return console.log(err);
      });
  }

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
    this.setState(
      { questions: myQuestions, nextId: this.state.nextId + 1 },
      () => this.SaveOnServer()
    );
  }

  removeQuestion(id) {
    console.log("Removing question: " + id);
    let myQuestions = this.state.questions.slice();
    const index = myQuestions.map((q) => q.id).indexOf(id);
    if (index > -1) {
      myQuestions.splice(index, 1);
    }
    this.setState({ questions: myQuestions }, () => this.SaveOnServer());
  }

  closeToast() {
    this.setState({ showToast: false });
  }

  SaveOnServer() {
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    const myRequest = new Request(
      `${process.env.REACT_APP_BACKEND_HOSTNAME}/save?room_uuid=${this.props.roomId}`,
      {
        method: "PUT",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body: JSON.stringify({
          title: this.state.gameTitle,
          questions: this.state.questions,
        }),
      }
    );

    fetch(myRequest).then(this.setState({ showToast: true }));
  }

  render() {
    if (this.state.requestStatus === undefined) {
      return <LoadingScreenComponent />;
    }
    if (this.state.requestStatus !== "OK") {
      return <ServerErrorMessageComponent msg={this.state.requestStatus} />;
    }
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
            <h1>
              <EditableLabel
                text={this.state.gameTitle}
                inputWidth="500px"
                inputHeight="50px"
                inputMaxLength="50"
                labelFontWeight="bold"
                inputFontWeight="bold"
                onFocusOut={this.handleFocusOut}
              />
            </h1>
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
