import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";

class PiecesCounterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { blackPieces, whitePieces } = this.props;
    let valueBlack = 1;
    let valueWhite = 1;
    if (blackPieces !== 0 || whitePieces !== 0) {
      valueBlack = (blackPieces * 100) / (blackPieces + whitePieces);
      valueWhite = (whitePieces * 100) / (blackPieces + whitePieces);
    }

    return (
      <div className="piecesCounterBar">
        <HSBar
          showTextUp
          data={[
            {
              name: blackPieces != 0 ? "Black pieces" : "",
              value: valueBlack,
              description: blackPieces != 0 ? `${blackPieces}` : "",
              color: "rgb(80,80,80)"
            },
            {
              name: whitePieces != 0 ? "White pieces" : "",
              value: valueWhite,
              description: whitePieces != 0 ? `${whitePieces}` : "",
              color: "rgb(230,230,230)"
            }
          ]}
        />
      </div>
    );
  }
}

export default PiecesCounterBar;
