let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
  if(started == false) {
    console.log("Game is started");
    started = true;

    levelUp();
  }
});
////////////////////////////////////
function playSound(color) {
  let soundMap = {
    red: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    yellow: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    green: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    purple: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
    wrong: "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
  };

  let audio = new Audio(soundMap[color]);
  audio.play();
}
///////////////////////////////////////

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  //random
  let randIdx = Math.floor(Math.random() * btns.length);
  let randcolor = btns[randIdx];
  let randBtn = document.querySelector(`.${randcolor}`);
  gameSeq.push(randcolor);
  console.log(gameSeq);
  gameFlash(randBtn);
  //
  playSound(randcolor);
  //
}

function checkAns(idx) {
  if(userSeq[idx] == gameSeq[idx]) {
    if(userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game over! Your socore was <b>${level}</b> <br>Press any key to start`;
    //
     playSound("wrong");
     //
    // document.querySelector("body").style.backgroundColor = "red";
     document.body.classList.add("game-over");
    // setTimeout(function() {
    //   document.querySelector("body").style.backgroundColor = "white";
    // },150);
    setTimeout(() => {
      document.body.classList.remove("game-over");
    }, 500);
    reSet();
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  }, 200);
}
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function() {
    btn.classList.remove("userFlash");
  }, 200);
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reSet() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
