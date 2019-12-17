import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

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
          {tile.king ? <FontAwesomeIcon icon={faCrown} /> : ""}
        </div>
      </div>
    );
  }
}

export default Tile;
