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
    table.forEach(tile => {
      tiles.push(
        <Tile
          key={`${tile.position.y}${tile.position.x}`}
          onClick={onClick}
          tile={tile}
        />
      );

      tileGray = !tileGray;
      if ((tile.position + 1) % 10 === 0) {
        tileGray = !tileGray;
      }
    });
    return <div className="table">{tiles}</div>;
  }
}

export default Table;
