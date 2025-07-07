let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let game = document.querySelector(".game");
let msg = document.querySelector(".msg");

let turnO = true; //it will define which turn it is

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const startGame=boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const showWinner = (winner, p1, p2, p3) => {
  for (let box of boxes) {
    box.disabled = true;
  }
  if (winner) {
    msg.innerText = `Congratulations ! Winner..${winner}`;
    p1.classList.add("winBox");
    p2.classList.add("winBox");
    p3.classList.add("winBox");
  } else {
    msg.innerText = "It's a Draw! Play Again.";
  }
};

const checkWinner = () => {
  let winnerFound = false;
  for (let pattern of winPattern) {
    // console.log(pattern[0],pattern[1],pattern[2]); //this will return indexes of winning pattern of all the elements form the array
    // console.log(boxes[pattern[0]],boxes[pattern[1]],boxes[pattern[2]]); //this will check for the box at current respective index like ( pattern[0]=1, pattern[1]=4,pattern[2]=7... then box[1],box[4],box[7])

    let p1 = boxes[pattern[0]];
    let p2 = boxes[pattern[1]];
    let p3 = boxes[pattern[2]];

    let val1 = boxes[pattern[0]].innerText;
    let val2 = boxes[pattern[1]].innerText;
    let val3 = boxes[pattern[2]].innerText;

    if (val1 !== "" && val2 != "" && val3 !== "") {
      if (val1 === val2 && val1 === val3) {
        winnerFound = true;
        game.classList.add("win");
        reset.innerText = "New Game";
        msg.classList.remove("hide");
        showWinner(val1, p1, p2, p3);
        break;
      }
    }
  }
  if (!winnerFound) {
    let isFull = true;
    boxes.forEach((box) => {
      if (box.innerText === "") {
        isFull = false;
      }
    });

    if (isFull) {
      game.classList.add("win");
      reset.innerText = "New Game";
      msg.classList.remove("hide");
      showWinner(null); // passing null to show draw
    }
  }
};

const resetGame = () => {
  for (box of boxes) {
    box.innerText = "";
    box.disabled = false;
    box.classList.remove("winBox");
  }
  msg.classList.add("hide");
  reset.innerText = "Reset Game";
  game.classList.remove("win");
  turnO = true;
  startGame();
};

reset.addEventListener("click", resetGame);
