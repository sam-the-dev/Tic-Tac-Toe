"use strict";

const reset = document.getElementById("reset-btn");
const message = document.querySelector(".message");
const grid = document.querySelector(".game-grid");
const allBoxes = document.querySelectorAll(".box");

const boxes = [];
boxes.push("Ignore");

for (let i = 1; i <= 9; i++) {
  boxes.push(document.querySelector(`.box-${i}`));
}

const winningCombinations = [
  [boxes[1], boxes[2], boxes[3]],
  [boxes[4], boxes[5], boxes[6]],
  [boxes[7], boxes[8], boxes[9]],
  [boxes[1], boxes[4], boxes[7]],
  [boxes[2], boxes[5], boxes[8]],
  [boxes[3], boxes[6], boxes[9]],
  [boxes[1], boxes[5], boxes[9]],
  [boxes[3], boxes[5], boxes[7]],
];

let setCount = 0;
let symbol = true;
let gameOver = false;

const checkWinner = function () {
  checkCount();

  winningCombinations.forEach((combination) => {
    const [boxA, boxB, boxC] = combination;

    if (
      boxA.firstElementChild?.src &&
      boxA.firstElementChild.src === boxB.firstElementChild?.src &&
      boxA.firstElementChild.src === boxC.firstElementChild?.src
    ) {
      const msgPlayer1 = `Player 1: <img src="./Assets/cross.png" alt="Cross" />
      <span class="highlight"> wins</span>`;

      const msgPlayer2 = `Player 2: <img src="./Assets/circle.png" alt="Cross" />
      <span class="highlight"> wins</span>`;

      message.innerHTML = boxA.firstElementChild.classList.contains("cross")
        ? msgPlayer1
        : msgPlayer2;

      message.classList.add("msg-spacing");

      gameOver = true;
    }
  });
};

const checkCount = function () {
  if (setCount === 9) {
    message.innerHTML = `It's a draw!<span class="highlight"> Try again</span>`;
    gameOver = true;
  }
};

const markSymbol = function (clicked) {
  if (
    !clicked.classList.contains("box") ||
    clicked.firstElementChild ||
    gameOver === true
  )
    return;

  setCount++;

  const markup = `<img src="./Assets/${
    symbol === true ? "cross" : "circle"
  }.png" alt="Zero" class="icon ${symbol === true ? "cross" : "circle"}" />`;

  clicked.insertAdjacentHTML("afterbegin", markup);

  symbol = !symbol;

  checkWinner();
};

const resetGame = function () {
  setCount = 0;
  gameOver = false;
  symbol = true;

  message.innerHTML = `Tic-Tac-Toe <span class="highlight">Game</span>`;

  allBoxes.forEach((el) => {
    if (el.firstElementChild) el.firstElementChild.remove();
    else return;
  });
};

grid.addEventListener("click", function (e) {
  markSymbol(e.target);
});

reset.addEventListener("click", resetGame);
