import React from "react";
import HSBar from "react-horizontal-stacked-bar-chart";

class CounterWinsBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { xWins, oWins } = this.props;
    let valueX = 1;
    let valueO = 1;
    if (xWins !== 0 || oWins !== 0) {
      valueX = (xWins * 100) / (xWins + oWins);
      valueO = (oWins * 100) / (xWins + oWins);
    }

    return (
      <div className="counterWinsBar">
        <HSBar
          showTextIn
          data={[
            {
              name: "Black pieces",
              value: valueX,
              description: `${xWins}`,
              color: "red"
            },
            {
              name: "White pieces",
              value: valueO,
              description: `${oWins}`,
              color: "rgb(150,150,220)"
            }
          ]}
        />
      </div>
    );
  }
}

export default CounterWinsBar;
