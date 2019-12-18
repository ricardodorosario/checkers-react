[![version](https://img.shields.io/github/package-json/v/ricardodorosario/checkers-react?style=flat-square)](https://github.com/ricardodorosario/checkers-react)

## checkers-react

An example of checkers game using React

![Checkers Screen](https://github.com/ricardodorosario/checkers-react/blob/master/images/checkers-react-screen.png)

## Rules

1. Each player starts with 12 pieces of the three rows closest to that player's side.
1. Moves are allowed only on the dark squares, so pieces always move diagonally.
1. Single pieces are always limited to forward moves (toward the opponent).
1. A piece making a non-capturing move (not involving a jump) may move only one square.
1. A piece making a capturing move (a jump) leaps over one of the opponent's pieces, landing in a straight diagonal line on the other side.
1. Only one piece may be captured in a single jump.
1. Multiple jumps are allowed during a single turn.
1. When a piece is captured, it is removed from the board.
1. If a player is able to make a capture, there is no option; the jump must be made. **(Not done yet)**.
1. If more than one capture is available, the player is free to choose whichever he or she prefers. **(Not done yet)**.
1. When a piece reaches the furthest row from the player who controls that piece, it is crowned and becomes a king.
1. Kings are able to moving diagonally both forward and backward.
1. The game ends when all the opponent's pieces were captured or when in 10 turns, no one was captured. In this case, the player who have mores pieces wins. **(Not done yet)**.

## Game is running on [games.pokolegas.com.br](https://games.pokolegas.com.br/checkers/)
