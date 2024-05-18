let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let savePlayersBtn = document.querySelector("#save-players");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1ScoreEl = document.querySelector("#player1-score");
let player2ScoreEl = document.querySelector("#player2-score");

let player1Name = localStorage.getItem("player1Name") || "Player 1";
let player2Name = localStorage.getItem("player2Name") || "Player 2";
let player1Score = parseInt(localStorage.getItem("player1Score")) || 0;
let player2Score = parseInt(localStorage.getItem("player2Score")) || 0;

document.querySelector("#player1-name").value = player1Name;
document.querySelector("#player2-name").value = player2Name;

player1ScoreEl.innerText = `${player1Name} (O): ${player1Score}`;
player2ScoreEl.innerText = `${player2Name} (X): ${player2Score}`;

let turnO = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const updateScores = () => {
  player1ScoreEl.innerText = `${player1Name} (O): ${player1Score}`;
  player2ScoreEl.innerText = `${player2Name} (X): ${player2Score}`;
  localStorage.setItem("player1Score", player1Score);
  localStorage.setItem("player2Score", player2Score);
};

savePlayersBtn.addEventListener("click", () => {
  player1Name = document.querySelector("#player1-name").value || "Player 1";
  player2Name = document.querySelector("#player2-name").value || "Player 2";
  localStorage.setItem("player1Name", player1Name);
  localStorage.setItem("player2Name", player2Name);
  updateScores();
});

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner === "O" ? player1Name : player2Name}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
  if (winner === "O") {
    player1Score++;
  } else {
    player2Score++;
  }
  updateScores();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);