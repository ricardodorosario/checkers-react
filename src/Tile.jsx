import React from "react";
import { AwardFill } from "react-bootstrap-icons";

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tile, onClick } = this.props;
    return (
      <div
        id={`${tile.position.y}${tile.position.x}`}
        y={tile.position.y}
        x={tile.position.x}
        className={`tile ${tile.tileColor}`}
        onClick={onClick}
      >
        <div
          className={`player ${tile.playerColor} ${
            tile.selected ? "selected" : "unselected"
          }`}
        >
          {tile.king ? <AwardFill /> : ""}
        </div>
      </div>
    );
  }
}

export default Tile;
