import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export class AddQuestionComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <label htmlFor="questionForm-url">Please enter your question:</label>
        <InputGroup>
          <FormControl
            id="questionForm"
            placeholder="How many dogs does John have?"
          />
          <InputGroup.Append>
            <Button variant="primary">Add</Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default AddQuestionComponent;
