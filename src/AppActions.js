//
export function init(component) {
  const table = [];
  let tileGray = "true";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const tile = {
        position: { y: y, x: x },
        playerColor: "",
        selected: false
      };
      if (
        ((y === 0 || y === 2) && x % 2 === 0) ||
        (y === 1 && (x + 1) % 2 === 0)
      ) {
        Object.assign(tile, { playerColor: "black" });
      }
      if (
        (y === 6 && x % 2 === 0) ||
        ((y === 5 || y === 7) && (x + 1) % 2 === 0)
      ) {
        Object.assign(tile, { playerColor: "white" });
      }
      Object.assign(tile, {
        tileColor: tileGray ? "tile-gray" : "tile-white"
      });
      table[`i${y}${x}`] = tile;
      tileGray = !tileGray;
    }
    tileGray = !tileGray;
  }
  component.setState(state => ({
    ...state,
    table
  }));
}
//
function canISelect(component, id) {
  const { table, whoPlay, tileSelected } = component.state;
  if (!table[`i${id}`]) {
    return false;
  }
  const tileWasSelected = table[`i${id}`].selected;
  const tilePlayerColor = table[`i${id}`].playerColor;
  if (whoPlay === tilePlayerColor && !tileWasSelected && !tileSelected) {
    return true;
  }
  return false;
}
//
function select(component, tileClicked, id) {
  const { table } = component.state;
  Object.assign(table[`i${id}`], { selected: true });
  component.setState(state => ({
    ...state,
    table,
    tileSelected: tileClicked
  }));
}
//
function canIUnselect(component, id) {
  const {
    table,
    whoPlay,
    tileSelected,
    nexMoveInAnyDirection
  } = component.state;
  const tileWasSelected = table[`i${id}`].selected;
  const tilePlayerColor = table[`i${id}`].playerColor;
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
//
function unselect(component, id) {
  const { table } = component.state;
  Object.assign(table[`i${id}`], { selected: false });
  component.setState(state => ({
    ...state,
    table,
    tileSelected: null
  }));
}
//
function canIMove(component, tileClicked, id) {
  const {
    table,
    whoPlay,
    tileSelected,
    nexMoveInAnyDirection
  } = component.state;
  const tilePlayerColor = table[`i${id}`].playerColor;
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
//
function move(component, id) {
  const { table, tileSelected, whoPlay } = component.state;
  Object.assign(table[`i${tileSelected.y}${tileSelected.x}`], {
    playerColor: ""
  });
  Object.assign(table[`i${id}`], { playerColor: whoPlay });
  component.setState(state => ({
    ...state,
    table
  }));
}
//
function changePlayer(component) {
  const { whoPlay } = component.state;
  component.setState(state => ({
    ...state,
    whoPlay: whoPlay === "black" ? "white" : "black"
  }));
}
//
function canITakeAPiece(component, tileClicked, id) {
  const {
    table,
    tileSelected,
    whoPlay,
    nexMoveInAnyDirection
  } = component.state;
  const tilePlayerColor = table[`i${id}`].playerColor;
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
//
function canITakeAPieceAnyDirection(component, tileClicked) {
  const { table } = component.state;
  let canTake = false;
  const possibleMoves = [
    { y: 2, x: 2 },
    { y: 2, x: -2 },
    { y: -2, x: 2 },
    { y: -2, x: -2 }
  ];
  possibleMoves.forEach(move => {
    const idOpponent = takeIdIfHasOpponent(component, tileClicked, {
      y: `${parseInt(tileClicked.y, 10) + move.y}`,
      x: `${parseInt(tileClicked.x, 10) + move.x}`
    });
    if (idOpponent) {
      const possibleMove =
        table[
          `i${parseInt(tileClicked.y, 10) + move.y}${parseInt(
            tileClicked.x,
            10
          ) + move.x}`
        ];
      if (possibleMove && possibleMove.playerColor === "") {
        canTake = true;
        return;
      }
    }
  });
  return canTake;
}
//
function takeIdIfHasOpponent(component, tileSelected, tileClicked) {
  const { table, whoPlay } = component.state;
  const sumY = (parseInt(tileSelected.y, 10) + parseInt(tileClicked.y, 10)) / 2;
  const sumX = (parseInt(tileSelected.x, 10) + parseInt(tileClicked.x, 10)) / 2;
  const idOpponent = `${sumY}${sumX}`;
  return table[`i${idOpponent}`] &&
    table[`i${idOpponent}`].playerColor !== whoPlay &&
    table[`i${idOpponent}`].playerColor !== ""
    ? idOpponent
    : null;
}
//
function takePiece(component, tileClicked) {
  const {
    table,
    whoPlay,
    blackPieces,
    whitePieces,
    tileSelected
  } = component.state;
  const idOpponent = takeIdIfHasOpponent(component, tileSelected, tileClicked);
  Object.assign(table[`i${idOpponent}`], { playerColor: "" });
  component.setState(state => ({
    ...state,
    table,
    blackPieces: whoPlay === "black" ? blackPieces : blackPieces - 1,
    whitePieces: whoPlay === "white" ? whitePieces : whitePieces - 1
  }));
}
//
function setNextMoveInAnyDirection(component, canIMove) {
  component.setState(state => ({
    ...state,
    nexMoveInAnyDirection: canIMove
  }));
}
//
export function onClick(component, a) {
  const { tileSelected } = component.state;
  const id = a.currentTarget.id;
  const tileClicked = {
    y: a.currentTarget.getAttribute("y"),
    x: a.currentTarget.getAttribute("x")
  };
  if (canISelect(component, id)) {
    select(component, tileClicked, id);
  } else {
    if (canIUnselect(component, id)) {
      unselect(component, id);
    } else {
      if (canIMove(component, tileClicked, id)) {
        move(component, id);
        unselect(component, `${tileSelected.y}${tileSelected.x}`);
        changePlayer(component, id);
      } else {
        if (canITakeAPiece(component, tileClicked, id)) {
          takePiece(component, tileClicked);
          move(component, id);
          setNextMoveInAnyDirection(component, false);
          unselect(component, `${tileSelected.y}${tileSelected.x}`);
          if (canITakeAPieceAnyDirection(component, tileClicked)) {
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
//
export function restart(component) {
  init(component);
  component.setState(state => ({
    ...state,
    whoPlay: "black",
    tileSelected: null,
    blackPieces: 20,
    whitePieces: 20,
    nexMoveInAnyDirection: false
  }));
}
