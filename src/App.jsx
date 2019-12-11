import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Table from "./Table";
import PiecesCounterBar from "./PiecesCounterBar";
import * as appActions from "./AppActions";
import Settings from "./Settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      blackStarts: true,
      whoPlay: "black",
      tileSelected: null,
      blackPieces: 12,
      whitePieces: 12,
      nexMoveInAnyDirection: false,
      showMenu: false
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
        <div className="bar">
          <Button
            className="menu-button"
            color="primary"
            onClick={() => appActions.showMenu(this, true)}
            size="small"
          >
            <MenuIcon size="small" />
          </Button>
          <div className="whoPlay">{whoPlay} plays</div>
        </div>
        <Table table={table} onClick={evt => appActions.onClick(this, evt)} />
        <div className="buttons">
          <Button
            variant="contained"
            color="primary"
            onClick={() => appActions.restart(this)}
          >
            Restart Game
          </Button>
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
        {this.state.showMenu && <Settings component={this} />}
      </div>
    );
  }
}

export default App;
