const E = (id) => {
  return document.getElementById(id);
};

const input_word = E("input_word");
const game = E("game");
const word = E("word");

const board = E("board");
const keyboard = E("keyboard");
const img = E("img_player");

const start = E("start");
const reveal = E("reveal");

let gameStarted = false;
let trys = 0;

let letterFind;
const wordData = {
  word: "",
  length: 0,
  wordArray: [],
};

const letters = [..."abcdefghijklmnñopqrstuvwxyz"];

const getWord = () => {
  const wordProcess = word.value.toLowerCase();
  wordData.word = wordProcess;
  wordData.wordArray = wordProcess.split("");
  wordData.length = wordProcess.length;
  letterFind = Array(wordData.length).fill("");
};

const printBoard = () => {
  board.innerHTML = "";
  letterFind.map((letter) => {
    board.innerHTML += `<div class="letter">${letter}</div`;
  });
};

const printKeyboardLetters = () => {
  letters.map((letter) => {
    keyboard.innerHTML += `<div class="keyboard_letter" id="letter_${letter}">${letter}</div>`;
  });
};

const validateLetter = (letter) => {
  wordData.wordArray.map((letterWord, i) => {
    letterWord === letter ? (letterFind[i] = letterWord) : null;
  });
  printBoard();
};

const validateLetterKeyboard = (letter) => {
  const key = E("letter_" + letter);
  if (!key) return;
  if (letterFind.includes(letter)) {
    key.classList.add("keyboard_letter_correct");
  } else {
    key.classList.add("keyboard_letter_incorrect");
  }
};

const validateTrys = (key) => {
  if (!letterFind.includes(key)) {
    trys++;
    img.src = `./img/sprite_0${trys}.webp`;
  }
  if (!letterFind.includes("")) {
    alert(`ganaste, la palabra es: ${wordData.word}, felicidades!`);
    document.location.reload();
  }
  if (trys > 6) {
    alert("perdiste, agotaste tus intentos!");
    document.location.reload();
  }
};

const startGame = () => {
  getWord();
  if (wordData.word !== "" && !wordData.wordArray.includes(" ")) {
    input_word.style.display = "none";
    game.style.display = "grid";
    gameStarted = true;
    printBoard();
    printKeyboardLetters();
  }
};

start.addEventListener("click", () => {
  startGame();
});

reveal.addEventListener("pointerdown", () => (word.type = "text"));
reveal.addEventListener("pointerup", () => (word.type = "password"));

document.addEventListener("keydown", ({ key }) => {
  if (gameStarted) {
    validateLetter(key);
    validateLetterKeyboard(key);
    validateTrys(key);
  }
});
