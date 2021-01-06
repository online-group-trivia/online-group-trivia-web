import React from "react";

class TeamInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const moves = this.props.players.map((player, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return <li key={move}>{player}</li>;
    });

    return <ol>{moves}</ol>;
  }
}

export default TeamInfo;
