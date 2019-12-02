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
    if (!table["i00"]) {
      return null;
    }
    for (let i = 0; i < 100; i++) {
      const index = i < 10 ? `i0${i}` : `i${i}`;
      tiles[i] = (
        <Tile
          key={`${table[index].position.y}${table[index].position.x}`}
          onClick={onClick}
          tile={table[index]}
        />
      );

      tileGray = !tileGray;
      if ((table[index].position.y + 1) % 10 === 0) {
        tileGray = !tileGray;
      }
    }
    return <div className="table">{tiles}</div>;
  }
}

export default Table;
