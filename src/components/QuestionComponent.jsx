import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Media from "react-bootstrap/Media";

export class QuestionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    this.props.onRemoveQuestion(this.props.question);
  }

  render() {
    return (
      <h1>
        <Badge variant="secondary">
          <Media>
            <Button
              variant="danger"
              size="sm"
              onClick={this.handleRemove}
              className="align-self-center mr-3"
            >
              X
            </Button>
            <div className="text-wrap" style={{ wordBreak: "break-all" }}>
              {this.props.question}
            </div>
          </Media>
        </Badge>
      </h1>
    );
  }
}

export default QuestionComponent;
