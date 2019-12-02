import React from "react";
import Table from "./Table";
import PiecesCounterBar from "./PiecesCounterBar";
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
    appActions.init(this);
  }

  render() {
    const { blackPieces, whitePieces, table, whoPlay } = this.state;
    return (
      <div className="app">
        <PiecesCounterBar blackPieces={blackPieces} whitePieces={whitePieces} />
        <div className="whoPlay">{whoPlay} plays</div>
        <Table table={table} onClick={evt => appActions.onClick(this, evt)} />
        <div className="buttons">
          <button className="button" onClick={() => appActions.restart(this)}>
            Restart Game
          </button>
        </div>
        <div className="footer">
          <h4>Contribute:</h4>
          <div>
            <a href="https://github.com/ricardodorosario/checkers-react">
              <img
                src="https://img.shields.io/github/package-json/v/ricardodorosario/checkers-react?style=flat-square"
                alt="github"
              />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
