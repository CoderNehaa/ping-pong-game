// assing all id for html
var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");
var ball = document.getElementById("ball");
const rodOne = "Player 1";
const rodTwo = "Player 2";
let winnerName = "abc";
let winnerScore = "123";
let score;
let highScore;
let rodName = rodOne;
let circleMoving;

// storage declare
localStorage.setItem(winnerScore, "null");
localStorage.setItem(winnerName, "null");

// IIFE to decide if it is new game.
(function () {
  highScore = localStorage.getItem(winnerScore);
  rodName = localStorage.getItem(winnerName);
  if (highScore === "null" || rodName === "null") {
    alert(
      " Hey! this is your First game. \n Press Left Arrow or Key S for moving left direction \n Press Right Arrow or Key D for moving right direction \n Press Enter to Start!"
    );
    highScore = 0;
    rodName = rodOne;
  } else {
    alert(rodName + " has a maximum score " + highScore * 100);
  }
  gameReset(rodName);
})();

// Reset the game
function gameReset(winningRod) {
  rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + "px";
  rod2.style.left = rod1.style.left;
  ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + "px";
  if (winningRod === rod1) {
    ball.style.top =
      rod2.getBoundingClientRect().y -
      rod2.getBoundingClientRect().height +
      "px";
    moveY = -5;
  } else if (winningRod === rod2) {
    ball.style.top = rod1.getBoundingClientRect().height + "px";
    moveY = 5;
  }
  score = 0;
}

let ballRect = ball.getBoundingClientRect();

document.addEventListener("keydown", (event) => {
  let temp = rod1.getBoundingClientRect().left;
  // For moving in the left direction
  if ((event.key === "a" || event.key === "ArrowLeft") && temp > 0) {
    temp = temp - 30;
    rod1.style.left = temp + "px";
    rod2.style.left = rod1.style.left;
  }

  // For moving in the right direction
  if (
    (event.key === "d" || event.key === "ArrowRight") &&
    temp < window.innerWidth - rod1.offsetWidth
  ) {
    temp = temp + 30;
    rod1.style.left = temp + "px";
    rod2.style.left = rod1.style.left;
  }

  let moveX = 5;
  let moveY = 5;
  // Enter will start the new round
  if (event.key === "Enter") {
    let ballLeft = ballRect.left;
    let ballTop = ballRect.top;

    circleMoving = setInterval(function () {
      // We move the ball in any direction.
      ball.style.left = ballLeft + moveX + "px";
      ball.style.top = ballTop + moveY + "px";
      ballLeft += moveX;
      ballTop += moveY;

      // If ball touches left or right border, it should start moving in other direction.
      if (ballLeft + ball.offsetWidth >= window.innerWidth || ballLeft < 0) {
        moveX = -moveX;
      }

      // If ball touches top or bottom border, then we should check if it hit the rod or not.
      if (ballTop <= rod1.offsetHeight) {
        moveY = -moveY;
        score++;
        // If ball has not hit the rod.
        if (
          ballLeft + ball.offsetWidth < rod1.getBoundingClientRect().left ||
          ballLeft + ball.offsetWidth >
            rod1.getBoundingClientRect().left + rod1.offsetWidth
        ) {
          dataStoring(score, rodTwo);
        }
      }

      if (ballTop >= window.innerHeight - rod1.offsetHeight * 2.4) {
        moveY = -moveY;
        score++;
        if (
          ballLeft + ball.offsetWidth < rod1.getBoundingClientRect().left ||
          ballLeft + ball.offsetWidth >
            rod1.getBoundingClientRect().left + rod1.offsetWidth
        ) {
          dataStoring(score, rodOne);
        }
      }
    }, 25);
  }
});

// Function dataStoring which will show the result and reset the game.

function dataStoring(scoreObt, winRod) {
  if (scoreObt > highScore) {
    highScore = scoreObt;
    localStorage.setItem(winnerName, winRod);
    localStorage.setItem(winnerScore, highScore);
  }
  clearInterval(circleMoving);
  gameReset(winRod);
  alert(
    "Game Over! " +
      "Win: " +
      localStorage.getItem(winnerName) +
      " with score of " +
      scoreObt * 100 +
      ". Max Score: " +
      localStorage.getItem(winnerScore) * 100
  );
}
