import React from "react";

class TeamInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const moves = this.props.players.map((player, i) => {
      return (
        <h1>
          <span class="badge bg-secondary">{player}</span>
        </h1>
      );
    });

    return <ol>{moves}</ol>;
  }
}

export default TeamInfo;
