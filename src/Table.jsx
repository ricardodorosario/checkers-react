import React from "react";
import Tile from "./Tile";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { table, onClick } = this.props;
    const tiles = [];
    let tileGray = true;
    if (!table.i00) {
      return null;
    }

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const index = `i${y}${x}`;
        const index2 = `${y + 1}${x}`;
        tiles[index2] = (
          <Tile key={index} onClick={onClick} tile={table[index]} />
        );

        tileGray = !tileGray;
      }
      tileGray = !tileGray;
    }
    return <div className="table">{tiles}</div>;
  }
}

export default Table;
