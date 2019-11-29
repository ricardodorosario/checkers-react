function canISelect(component, id) {
  const { table, whoPlay, tileSelected } = component.state;
  const tileWasSelected = table[id].selected;
  const tilePlayerColor = table[id].playerColor;
  if (whoPlay === tilePlayerColor && !tileWasSelected && !tileSelected) {
    return true;
  }
  return false;
}

function select(component, tileClicked, id) {
  const { table } = component.state;
  Object.assign(table[id], { selected: true });
  component.setState(state => ({
    ...state,
    table,
    tileSelected: tileClicked
  }));
}

function canIUnselect(component, id) {
  const {
    table,
    whoPlay,
    tileSelected,
    nexMoveInAnyDirection
  } = component.state;
  const tileWasSelected = table[id].selected;
  const tilePlayerColor = table[id].playerColor;
  if (
    whoPlay === tilePlayerColor &&
    tileWasSelected &&
    tileSelected &&
    !nexMoveInAnyDirection
  ) {
    return true;
  }
  return false;
}

function unselect(component, id) {
  const { table } = component.state;
  Object.assign(table[id], { selected: false });
  component.setState(state => ({
    ...state,
    table,
    tileSelected: null
  }));
}

function canIMove(component, tileClicked, id) {
  const {
    table,
    whoPlay,
    tileSelected,
    nexMoveInAnyDirection
  } = component.state;
  const tilePlayerColor = table[id].playerColor;
  if (!tileSelected || nexMoveInAnyDirection) {
    return false;
  }
  const posibleMoves =
    whoPlay === "black"
      ? [
          {
            y: parseInt(tileSelected.y, 10) + 1,
            x: parseInt(tileSelected.x, 10) + 1
          },
          {
            y: parseInt(tileSelected.y, 10) + 1,
            x: parseInt(tileSelected.x, 10) - 1
          }
        ]
      : [
          {
            y: parseInt(tileSelected.y, 10) - 1,
            x: parseInt(tileSelected.x, 10) - 1
          },
          {
            y: parseInt(tileSelected.y, 10) - 1,
            x: parseInt(tileSelected.x, 10) + 1
          }
        ];
  return (
    posibleMoves.some(
      move =>
        move.x === parseInt(tileClicked.x, 10) &&
        move.y === parseInt(tileClicked.y, 10)
    ) && tilePlayerColor === ""
  );
}

function move(component, id) {
  const { table, tileSelected, whoPlay } = component.state;
  Object.assign(table[`${tileSelected.y}${tileSelected.x}`], {
    playerColor: ""
  });
  Object.assign(table[id], { playerColor: whoPlay });
  component.setState(state => ({
    ...state,
    table
  }));
}

function changePlayer(component) {
  const { whoPlay } = component.state;
  component.setState(state => ({
    ...state,
    whoPlay: whoPlay === "black" ? "white" : "black"
  }));
}

function canITakeAPiece(component, tileClicked, id) {
  const {
    table,
    tileSelected,
    whoPlay,
    nexMoveInAnyDirection
  } = component.state;
  const tilePlayerColor = table[id].playerColor;
  if (!tileSelected) {
    return false;
  }
  const hasOpponent = takeIdIfHasOpponent(component, tileSelected, tileClicked)
    ? true
    : false;
  let posibleMoves = [];
  if (whoPlay === "black" || nexMoveInAnyDirection) {
    posibleMoves.push({
      y: parseInt(tileSelected.y, 10) + 2,
      x: parseInt(tileSelected.x, 10) + 2
    });
    posibleMoves.push({
      y: parseInt(tileSelected.y, 10) + 2,
      x: parseInt(tileSelected.x, 10) - 2
    });
  }
  if (whoPlay === "white" || nexMoveInAnyDirection) {
    posibleMoves.push({
      y: parseInt(tileSelected.y, 10) - 2,
      x: parseInt(tileSelected.x, 10) - 2
    });
    posibleMoves.push({
      y: parseInt(tileSelected.y, 10) - 2,
      x: parseInt(tileSelected.x, 10) + 2
    });
  }
  return (
    posibleMoves.some(
      move =>
        move.x === parseInt(tileClicked.x, 10) &&
        move.y === parseInt(tileClicked.y, 10)
    ) &&
    hasOpponent &&
    tilePlayerColor === ""
  );
}

function canITakeAPieceAnyDirection(component, tileClicked) {
  const { table } = component.state;
  let idOpponent;
  idOpponent = takeIdIfHasOpponent(component, tileClicked, {
    y: `${parseInt(tileClicked.y, 10) + 2}`,
    x: `${parseInt(tileClicked.x, 10) + 2}`
  });
  if (idOpponent) {
    return (
      table[
        `${parseInt(tileClicked.y, 10) + 2}${parseInt(tileClicked.x, 10) + 2}`
      ].playerColor === ""
    );
  }
  idOpponent = takeIdIfHasOpponent(component, tileClicked, {
    y: `${parseInt(tileClicked.y, 10) + 2}`,
    x: `${parseInt(tileClicked.x, 10) - 2}`
  });
  if (idOpponent) {
    return (
      table[
        `${parseInt(tileClicked.y, 10) + 2}${parseInt(tileClicked.x, 10) - 2}`
      ].playerColor === ""
    );
  }
  idOpponent = takeIdIfHasOpponent(component, tileClicked, {
    y: `${parseInt(tileClicked.y, 10) - 2}`,
    x: `${parseInt(tileClicked.x, 10) + 2}`
  });
  if (idOpponent) {
    return (
      table[
        `${parseInt(tileClicked.y, 10) - 2}${parseInt(tileClicked.x, 10) + 2}`
      ].playerColor === ""
    );
  }
  idOpponent = takeIdIfHasOpponent(component, tileClicked, {
    y: `${parseInt(tileClicked.y, 10) - 2}`,
    x: `${parseInt(tileClicked.x, 10) - 2}`
  });
  if (idOpponent) {
    return (
      table[
        `${parseInt(tileClicked.y, 10) - 2}${parseInt(tileClicked.x, 10) - 2}`
      ].playerColor === ""
    );
  }
  return false;
}

function takeIdIfHasOpponent(component, tileSelected, tileClicked) {
  const { table, whoPlay } = component.state;
  const sumY = (parseInt(tileSelected.y, 10) + parseInt(tileClicked.y, 10)) / 2;
  const sumX = (parseInt(tileSelected.x, 10) + parseInt(tileClicked.x, 10)) / 2;
  const idOpponent = `${sumY}${sumX}`;
  return table[idOpponent] &&
    table[idOpponent].playerColor !== whoPlay &&
    table[idOpponent].playerColor !== ""
    ? idOpponent
    : null;
}

function takePiece(component, tileClicked) {
  const {
    table,
    whoPlay,
    blackPieces,
    whitePieces,
    tileSelected
  } = component.state;
  const idOpponent = takeIdIfHasOpponent(component, tileSelected, tileClicked);
  Object.assign(table[idOpponent], { playerColor: "" });
  component.setState(state => ({
    ...state,
    table,
    blackPieces: whoPlay === "black" ? blackPieces : blackPieces - 1,
    whitePieces: whoPlay === "white" ? whitePieces : whitePieces - 1
  }));
}

function setNextMoveInAnyDirection(component, canIMove) {
  component.setState(state => ({
    ...state,
    nexMoveInAnyDirection: canIMove
  }));
}

export function onClick(component, a) {
  const { tileSelected } = component.state;
  const id = a.currentTarget.id;
  const tileClicked = {
    y: a.currentTarget.getAttribute("y"),
    x: a.currentTarget.getAttribute("x")
  };
  //console.log(a.currentTarget);
  if (canISelect(component, id)) {
    console.log("I can select");
    select(component, tileClicked, id);
  } else {
    if (canIUnselect(component, id)) {
      console.log("I can unselect");
      unselect(component, id);
    } else {
      if (canIMove(component, tileClicked, id)) {
        console.log("I can move");
        move(component, id);
        unselect(component, `${tileSelected.y}${tileSelected.x}`);
        changePlayer(component, id);
      } else {
        if (canITakeAPiece(component, tileClicked, id)) {
          console.log("I can take a piece");
          takePiece(component, tileClicked);
          move(component, id);
          setNextMoveInAnyDirection(component, false);
          unselect(component, `${tileSelected.y}${tileSelected.x}`);
          if (canITakeAPieceAnyDirection(component, tileClicked)) {
            console.log("I can take a piece in any direction");
            select(component, tileClicked, id);
            setNextMoveInAnyDirection(component, true);
          } else {
            changePlayer(component, id);
          }
        }
      }
    }
  }
}
