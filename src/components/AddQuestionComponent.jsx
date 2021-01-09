import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

export class AddQuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter" && this.state.value) {
      this.handleAdd();
    }
  };

  handleAdd() {
    this.props.onAddQuestion(this.state.value);
    this.setState({ value: "" });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div>
        <label htmlFor="questionForm-url">Please enter your question:</label>
        <InputGroup>
          <FormControl
            id="questionForm"
            placeholder="How many dogs does John have?"
            onChange={this.handleChange}
            value={this.state.value}
            onKeyPress={this.handleKeyPress}
          />
          <InputGroup.Append>
            <Button
              variant="primary"
              onClick={this.handleAdd}
              disabled={!this.state.value}
            >
              Add
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
    );
  }
}

export default AddQuestionComponent;
