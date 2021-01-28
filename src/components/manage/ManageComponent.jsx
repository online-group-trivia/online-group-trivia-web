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

import { useSelector, useDispatch } from "react-redux";
import {
  addQuestion,
  removeQuestion,
  changeTitle,
  selectTitle,
  selectQuestions,
  setInitialState,
  selectgameId,
} from "./manageSlice";
import React, { useState, useEffect } from "react";
export function ManageComponent(props) {
  const [requestStatus, setRequestStatus] = useState(undefined);
  const dispatch = useDispatch();

  const title = useSelector(selectTitle);
  const gameId = useSelector(selectgameId);
  const questions = useSelector(selectQuestions);
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

  function addQuestionToStore(questionStr) {
    console.log("Got question: " + questionStr);
    let tempSet = new Set(questions);
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
      `${process.env.REACT_APP_BACKEND_HOSTNAME}/save?gameId=${gameId}`,
      data
    );
  }

  function getGameDataFromServer() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_HOSTNAME}/manage?gameId=${props.gameId}`
      )
      .then((response) => {
        if (response.data === undefined) {
          return;
        }
        dispatch(
          setInitialState({
            title: response.data["title"],
            gameId: props.gameId,
            questions: response.data["questions"],
          })
        );
        setRequestStatus("OK");
        document.title = "Group Trivia | " + title;
      })
      .catch((error) => {
        if (error.response) {
          setRequestStatus(error.response.status);
        } else if (error.request) {
          setRequestStatus("Server unreachable");
        }
      });
  }

  function removeQuestionFromStore(question) {
    saveOnServer({
      RemoveQuestion: {
        question: question,
      },
    }).then(() => dispatch(removeQuestion(question)));
    console.log("Removing question: " + question);
  }

  if (requestStatus === undefined) {
    return <LoadingScreenComponent />;
  }
  if (requestStatus !== "OK") {
    return <ServerErrorMessageComponent msg={requestStatus} />;
  }
  const myQuestions = questions.slice().map((question) => {
    return (
      <QuestionComponent
        onRemoveQuestion={(question) => removeQuestionFromStore(question)}
        key={question}
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
              text={title}
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
        </Col>
      </Row>
      <Row>
        <Col sm={7}>
          <AddQuestionComponent onAddQuestion={(q) => addQuestionToStore(q)} />
        </Col>
        <Col sm={5}>
          <ol>{myQuestions}</ol>
        </Col>
      </Row>
    </Container>
  );
}

export default ManageComponent;
