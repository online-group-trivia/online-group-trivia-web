import React from "react";

class TeamInfo extends React.Component {
  render() {
    const moves = this.props.players.map((player, i) => {
      return (
        <h1>
          <span className="badge bg-secondary">{player}</span>
        </h1>
      );
    });

    return (
      <div className="text-center ">
        <h2>{this.props.teamName}</h2>
        <ol>{moves}</ol>
      </div>
    );
  }
}

export default TeamInfo;
