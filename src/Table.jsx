import React from "react";
import Tile from "./Tile";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { table, onClick } = this.props;
    const tiles = [];
    if (!table[0]) {
      return null;
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tiles.push(
          <Tile key={`idx_${y}${x}`} onClick={onClick} tile={table[y][x]} />
        );
      }
    }
    return <div className="table">{tiles}</div>;
  }
}

export default Table;
