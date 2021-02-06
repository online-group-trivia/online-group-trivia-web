import "./ManageComponent.css";
import QuestionComponent from "../QuestionComponent";
import AddQuestionComponent from "./AddQuestionComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreenComponent from "../LoadingScreenComponent";
import ServerErrorMessageComponent from "../ServerErrorMessageComponent";
import EditableLabel from "react-inline-editing";
import axios from "axios";

import { useDispatch, connect } from "react-redux";
import {
  addQuestion,
  removeQuestion,
  changeTitle,
  getGameDataAxios,
  startGameAxios,
} from "../../reducers/homeReducer";

import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";

export function ManageComponent(props) {
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(getGameDataFromServer, []);

  function changeTitleInStore(text) {
    saveOnServer({
      ChangeTitle: {
        title: text,
      },
    }).then(() => dispatch(changeTitle(text)));
    console.log("Left editor with text: " + text);
  }

  function startGame() {
    dispatch(startGameAxios(props.gameId));
  }

  function addQuestionToStore(questionStr) {
    console.log("Got question: " + questionStr);
    let tempSet = new Set(props.questions);
    if (!tempSet.has(questionStr)) {
      saveOnServer({
        AddQuestion: {
          question: questionStr,
        },
      }).then(() => dispatch(addQuestion(questionStr)));
    }
  }

  async function saveOnServer(data) {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_HOSTNAME}/save?gameId=${props.gameId}`,
      data
    );
  }

  function getGameDataFromServer() {
    if (props.hasData) {
      return;
    }
    dispatch(getGameDataAxios(props.gameId));
  }

  function removeQuestionFromStore(question) {
    saveOnServer({
      RemoveQuestion: {
        question: question,
      },
    }).then(() => dispatch(removeQuestion(question)));
    console.log("Removing question: " + question);
  }

  console.log(props);
  if (props.gameDataStatus === undefined) {
    return <LoadingScreenComponent />;
  }
  if (props.gameDataStatus !== "OK") {
    return <ServerErrorMessageComponent msg={props.gameDataStatus} />;
  }
  const myQuestions = props.questions.slice().map((question) => {
    return (
      <QuestionComponent
        onRemoveQuestion={(question) => removeQuestionFromStore(question)}
        key={question}
        question={question}
      ></QuestionComponent>
    );
  });

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="justify-content-md-center">
        <h1>
          <EditableLabel
            text={props.title}
            inputWidth="500px"
            inputHeight="50px"
            inputMaxLength={50}
            labelFontWeight="bold"
            inputFontWeight="bold"
            onFocusOut={(textAfterChange) =>
              changeTitleInStore(textAfterChange)
            }
          />
        </h1>
      </Row>
      <Row className="justify-content-md-center">
        <Col sm={8}>
          <AddQuestionComponent onAddQuestion={(q) => addQuestionToStore(q)} />
        </Col>
        <Col>
          <Button variant="primary" onClick={() => startGame()}>
            Start Game
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>{myQuestions}</Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    hasData: state.home.hasData,
    questions: state.home.questions,
    title: state.home.title,
    gameDataStatus: state.home.gameDataStatus,
  };
};

export default connect(mapStateToProps)(ManageComponent);
