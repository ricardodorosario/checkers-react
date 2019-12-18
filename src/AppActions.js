//
export function init(component) {
  const table = [];
  let tileGray = "true";
  for (let y = 0; y < 8; y++) {
    const row = [];
    for (let x = 0; x < 8; x++) {
      const tile = {
        position: { y: y, x: x },
        playerColor: "",
        selected: false,
        king: false
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
      row.push(tile);
      tileGray = !tileGray;
    }
    table.push(row);
    tileGray = !tileGray;
  }
  component.setState(state => ({
    ...state,
    table
  }));
}
//
function canISelect(component, tileClicked) {
  const { table, whoPlay, tileSelected } = component.state;
  if (!table[tileClicked.y]) {
    return false;
  }
  const tileWasSelected = table[tileClicked.y][tileClicked.x].selected;
  const tilePlayerColor = table[tileClicked.y][tileClicked.x].playerColor;
  if (whoPlay === tilePlayerColor && !tileWasSelected && !tileSelected) {
    return true;
  }
  return false;
}
//
function select(component, tileClicked) {
  const { table } = component.state;
  Object.assign(table[tileClicked.y][tileClicked.x], { selected: true });
  component.setState(state => ({
    ...state,
    table,
    tileSelected: tileClicked
  }));
}
//
function canIUnselect(component, tileClicked) {
  const {
    table,
    whoPlay,
    tileSelected,
    nexMoveInAnyDirection
  } = component.state;
  const tileWasSelected = table[tileClicked.y][tileClicked.x].selected;
  const tilePlayerColor = table[tileClicked.y][tileClicked.x].playerColor;
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
function unselect(component, tileClicked) {
  const { table } = component.state;
  Object.assign(table[tileClicked.y][tileClicked.x], { selected: false });
  component.setState(state => ({
    ...state,
    table,
    tileSelected: null
  }));
}
//
function ableToBeKing(component, tileClicked) {
  const { whoPlay, king } = component.state;
  if (
    !king &&
    ((whoPlay === "white" && tileClicked.y === "0") ||
      (whoPlay === "black" && tileClicked.y === "7"))
  ) {
    return true;
  }
  return false;
}
//
function changeKing(component, tileClicked, isKing) {
  const { table } = component.state;
  Object.assign(table[tileClicked.y][tileClicked.x], { king: isKing });
  component.setState(state => ({
    ...state,
    table
  }));
}
//
function canIMove(component, tileClicked) {
  const {
    table,
    whoPlay,
    tileSelected,
    nexMoveInAnyDirection
  } = component.state;
  if (!tileSelected || nexMoveInAnyDirection) {
    return false;
  }
  const tilePlayerColor = table[tileClicked.y][tileClicked.x].playerColor;
  const king = table[tileSelected.y][tileSelected.x].king;
  const blackPossibleMoves = [
    {
      y: parseInt(tileSelected.y, 10) + 1,
      x: parseInt(tileSelected.x, 10) + 1
    },
    {
      y: parseInt(tileSelected.y, 10) + 1,
      x: parseInt(tileSelected.x, 10) - 1
    }
  ];
  const whitePossibleMoves = [
    {
      y: parseInt(tileSelected.y, 10) - 1,
      x: parseInt(tileSelected.x, 10) - 1
    },
    {
      y: parseInt(tileSelected.y, 10) - 1,
      x: parseInt(tileSelected.x, 10) + 1
    }
  ];

  let posibleMoves =
    whoPlay === "black" ? blackPossibleMoves : whitePossibleMoves;
  posibleMoves = king
    ? blackPossibleMoves.concat(whitePossibleMoves)
    : posibleMoves;
  return (
    posibleMoves.some(
      move =>
        move.x === parseInt(tileClicked.x, 10) &&
        move.y === parseInt(tileClicked.y, 10)
    ) && tilePlayerColor === ""
  );
}
//
function move(component, tileClicked) {
  const { table, tileSelected, whoPlay } = component.state;
  const king = table[tileSelected.y][tileSelected.x].king;
  Object.assign(table[tileSelected.y][tileSelected.x], {
    playerColor: "",
    king: false
  });
  Object.assign(table[tileClicked.y][tileClicked.x], { playerColor: whoPlay });
  if (king) {
    changeKing(component, tileClicked, true);
  }
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
function canITakeAPiece(component, tileClicked) {
  const {
    table,
    tileSelected,
    whoPlay,
    nexMoveInAnyDirection
  } = component.state;
  const tilePlayerColor = table[tileClicked.y][tileClicked.x].playerColor;
  if (!tileSelected) {
    return false;
  }
  const king = table[tileSelected.y][tileSelected.x].king;
  const hasOpponent = takePositionIfHasOpponent(
    component,
    tileSelected,
    tileClicked
  )
    ? true
    : false;
  let posibleMoves = [];
  if (whoPlay === "black" || nexMoveInAnyDirection || king) {
    posibleMoves.push({
      y: parseInt(tileSelected.y, 10) + 2,
      x: parseInt(tileSelected.x, 10) + 2
    });
    posibleMoves.push({
      y: parseInt(tileSelected.y, 10) + 2,
      x: parseInt(tileSelected.x, 10) - 2
    });
  }
  if (whoPlay === "white" || nexMoveInAnyDirection || king) {
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
    const posOpponent = takePositionIfHasOpponent(component, tileClicked, {
      y: `${parseInt(tileClicked.y, 10) + move.y}`,
      x: `${parseInt(tileClicked.x, 10) + move.x}`
    });
    if (posOpponent) {
      if (
        parseInt(tileClicked.y, 10) + move.y < 0 ||
        parseInt(tileClicked.x, 10) + move.x < 0
      ) {
        return;
      }
      const possibleMove =
        table[parseInt(tileClicked.y, 10) + move.y][
          parseInt(tileClicked.x, 10) + move.x
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
function takePositionIfHasOpponent(component, tileSelected, tileClicked) {
  const { table, whoPlay } = component.state;
  if (!tileSelected) {
    return false;
  }
  const sumY = (parseInt(tileSelected.y, 10) + parseInt(tileClicked.y, 10)) / 2;
  const sumX = (parseInt(tileSelected.x, 10) + parseInt(tileClicked.x, 10)) / 2;
  return table[sumY] &&
    table[sumY][sumX] &&
    table[sumY][sumX].playerColor !== whoPlay &&
    table[sumY][sumX].playerColor !== ""
    ? { y: sumY, x: sumX }
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
  const posOpponent = takePositionIfHasOpponent(
    component,
    tileSelected,
    tileClicked
  );
  changeKing(component, posOpponent, false);
  Object.assign(table[posOpponent.y][posOpponent.x], { playerColor: "" });
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
export function onClick(component, evt) {
  const { tileSelected } = component.state;
  const tileClicked = {
    y: evt.currentTarget.getAttribute("y"),
    x: evt.currentTarget.getAttribute("x")
  };
  if (canISelect(component, tileClicked)) {
    select(component, tileClicked);
  } else {
    if (canIUnselect(component, tileClicked)) {
      unselect(component, tileClicked);
    } else {
      if (canIMove(component, tileClicked)) {
        move(component, tileClicked);
        unselect(component, tileSelected);
        if (ableToBeKing(component, tileClicked)) {
          changeKing(component, tileClicked, true);
        }
        changePlayer(component, tileClicked);
      } else {
        if (canITakeAPiece(component, tileClicked)) {
          takePiece(component, tileClicked);
          move(component, tileClicked);
          if (ableToBeKing(component, tileClicked)) {
            changeKing(component, tileClicked, true);
          }
          setNextMoveInAnyDirection(component, false);
          unselect(component, tileSelected);
          if (canITakeAPieceAnyDirection(component, tileClicked)) {
            select(component, tileClicked);
            setNextMoveInAnyDirection(component, true);
          } else {
            changePlayer(component, tileClicked);
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
    whoPlay: component.state.blackStarts ? "black" : "white",
    tileSelected: null,
    blackPieces: 12,
    whitePieces: 12,
    nexMoveInAnyDirection: false
  }));
}
//
export function showMenu(component, showMenu) {
  component.setState(state => ({
    ...state,
    showMenu
  }));
}
