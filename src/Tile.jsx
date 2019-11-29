import React from "react";

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
        ></div>
      </div>
    );
  }
}

export default Tile;
