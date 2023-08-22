const hangmanImage = document.querySelector(".hangman-box img");
const keyboardDiv = document.querySelector(".keyboard");
const guessesText = document.querySelector(".guesses-text b");
const wordDisplay = document.querySelector(".word-display");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord,
  correctLetters,
  wrongGuessCount = 0;
const maxGuesses = 6;

const wordList = [
  {
    word: "adventure",
    hint: "An exciting and daring experience",
  },
  {
    word: "explore",
    hint: "TO travel and discover new places or things",
  },
  {
    word: "curious",
    hint: "Eager to learn or know about new things",
  },
  {
    word: "recipe",
    hint: "Instructions for preparing a particular dish",
  },
  {
    word: "village",
    hint: "A small community in a rural area",
  },
  {
    word: "museum",
    hint: "A place where valuable objects are dislayed for public viewing",
  },
  {
    word: "inventor",
    hint: "Someone who creates new things or ideas",
  },
  {
    word: "evaporation",
    hint: "The process of turning a liquid into vapor, often due to heat",
  },
  {
    word: "migrate",
    hint: "To move from one place to another, usually seasonally",
  },
  {
    word: "robot",
    hint: "A machine that can be programmed to perform tasks automatically",
  },
  {
    word: "gravity",
    hint: "The force that pulls objects towards the center of the Earth",
  },
  {
    word: "carnivore",
    hint: "An animal that mainly eats meat",
  },
  {
    word: "dinosaur",
    hint: "Extinct reptiles that lived millions of years ago",
  },
  {
    word: "rainbow",
    hint: "A colorful arc in the sky that appears after rain, caused by sunlight refracting through water droplets",
  },
  {
    word: "magnet",
    hint: "An object that attracts certain materials like iron",
  },
];

const resetGame = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  document.querySelector(".hint-text b").innerText = hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word: `
      : `The correct word was: `;
    gameModal.querySelector("img").src = `images/${
      isVictory ? "victory" : "lost"
    }.gif`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? "Congrats!" : "Game Over!"
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboardDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
