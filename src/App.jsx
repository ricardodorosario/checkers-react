import React from "react";
import Table from "./Table";
import CounterWinsBar from "./CounterWinsBar";
import * as appActions from "./AppActions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      whoPlay: "black",
      tileSelected: null,
      blackPieces: 20,
      whitePieces: 20,
      nexMoveInAnyDirection: false
    };
  }

  componentDidMount() {
    const table = [];
    let tileGray = "true";
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const tile = {
          position: { y: y, x: x },
          playerColor: "",
          selected: false
        };
        if (
          ((y === 0 || y === 2) && x % 2 === 0) ||
          ((y === 1 || y === 3) && (x + 1) % 2 === 0)
        ) {
          Object.assign(tile, { playerColor: "black" });
        }
        if (
          ((y === 6 || y === 8) && x % 2 === 0) ||
          ((y === 7 || y === 9) && (x + 1) % 2 === 0)
        ) {
          Object.assign(tile, { playerColor: "white" });
        }
        Object.assign(tile, {
          tileColor: tileGray ? "tile-gray" : "tile-white"
        });
        table.push(tile);
        tileGray = !tileGray;
      }
      tileGray = !tileGray;
    }
    this.setState(state => ({
      ...state,
      table
    }));
  }

  render() {
    return (
      <div className="app">
        <CounterWinsBar
          xWins={this.state.blackPieces}
          oWins={this.state.whitePieces}
        />
        <div className="whoPlay">{this.state.whoPlay} plays</div>
        <Table
          table={this.state.table}
          onClick={evt => appActions.onClick(this, evt)}
        />
        <div className="buttons">
          <button className="button" onClick={() => appActions.restart(this)}>
            Restart Game
          </button>
          <button
            className="button"
            onClick={() => appActions.restartScoreboard(this)}
          >
            Restart Scoreboard
          </button>
        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
