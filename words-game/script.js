const MAX_LIVES = 8;
const LIFE_PRICE = 5;
const WORD_LENGTH = 5;

document.addEventListener("DOMContentLoaded", () => {
  const lettersEl = document.getElementById("letters");
  const buyButton = document.querySelector(".header .info .buy-button ");
  const guessEl = document.querySelector(".guess.main");
  const modalGuessEl = document.querySelector(".result .guess");
  const newGameButton = document.querySelector(".result .new-game-button");
  const modal = document.querySelector(".result");
  const modalTitle = document.querySelector(".result .title");
  const coinsTextEl = document.querySelector(
    ".header .info .coins .coins-count"
  );

  const letters = [..."abcdefghijklmnopqrstuvwxyz"];

  const correctAudio = new Audio("./assets/success_02-68338.mp3");
  const wrongAudio = new Audio("./assets/error-126627.mp3");
  const winAudio = new Audio("./assets/game-bonus-144751.mp3");
  const loseAudio = new Audio("./assets/failure-drum-sound-effect-2-7184.mp3");
  const coinsAudio = new Audio("./assets/coin-and-money-bag-3-185264.mp3");

  let lives = MAX_LIVES;
  let points = 0; // Coins count
  let answer; // The correct answer, will be populated every new game
  let guess = Array(WORD_LENGTH).fill(""); // User's guess as an array ex. ["", "s", "", "s","e"]
  let chosenLetters = []; // Keeping track of all the letters that were chosen previously in 1 game.

  // Called when clicking on a letter
  function chooseLetter(letter) {
    // If the letter is already chosen or we don't have lives, exit early.
    if (chosenLetters.includes(letter) || lives === 0) return;

    let result; // In case of the chosen letter will result in a win or loss, store the result here.

    // indexes will store the indexes of the letter in the answer in case the chosen letter exists in the answer. Ex. if the answer is "GREEK" & the chosen letter is "E", then indexes will be [2,3]
    // indexes will be an empty array in case the chosen letter is wrong.
    const indexes = answer
      .map((l, i) => (l === letter ? i : null))
      .filter((l) => l !== null);

    // indexes.length will be greater than zero if the chosen letter is correct.
    if (indexes.length > 0) {
      coinsTextEl.style.viewTransitionName = "coins";
      points += 10; // add 10 points for every correct guess.
      indexes.forEach((i) => (guess[i] = letter)); // populate the user's guess array

      // If the guess is the same as the answer, then the user won, play an audio and populate result.
      // Otherwise just play another audio for a correct guess.
      if (guess.join("") === answer.join("")) {
        winAudio.play();
        result = "win";
      } else {
        correctAudio.play();
      }
      // This is the else of (indexes.length > 0), which means the guess was wrong
    } else {
      lives -= 1; // Decrement lives

      // If no more lives exist then end the game by populating result and playing an audio
      // Otherwise just play an audio for a wrong guess
      if (lives === 0) {
        loseAudio.play();
        result = "loss";
      } else {
        wrongAudio.play();
      }
    }

    chosenLetters.push(letter); // keep track of chosen letters

    // Update the DOM based on the chosen letter, the correct indexes and the result (if we have a result)
    const transition = document.startViewTransition(() => {
      updateDOM(letter, indexes, result);
    });

    transition.finished.then(() => {
      coinsTextEl.style.viewTransitionName = "none";
    });
  }

  // This function updates the DOM based on the chosen letter (if exists), the correct indexes (if exists) and the final result (if exists)
  function updateDOM(letter, indexes, result) {
    // if we have a final result, display the modal
    if (result) {
      displayModal(result);
    }
    // if we have a chosen letter, remove it from the list of letter buttons.
    if (letter) {
      const buttonToRemove = document.querySelector(`.letter.letter-${letter}`);
      buttonToRemove.remove();
    }
    // if we have a chosen letter and that letter is a correct guess, then populate the guess slots.
    if (letter && indexes) {
      populateGuess(letter, indexes);
    }

    // Update the dom for the lives and coins based on the new lives and points variables.
    populateLives();
    populateCoins();
  }

  // This function initializes the DOM on load and on every new game.
  function initDOM() {
    // Populate lives and coins DOM
    populateCoins();
    populateLives();

    // Clear all letters and guesses to repopulate them
    lettersEl.innerHTML = "";
    guessEl.innerHTML = "";
    modalGuessEl.innerHTML = "";
    // Hide Modal if it was shown
    modal.classList.add("hide");

    // Loop through all alphabet letters and populate the letter buttons.
    letters.forEach((letter) => {
      let occurrences = 0;

      answer.forEach((l) => {
        if (l === letter) {
          occurrences += 1;
        }
      });

      const letterWrapper = document.createElement("div");
      letterWrapper.classList.add(`letter`, `letter-${letter}`);

      const buttons = [];

      const button = document.createElement("button");
      button.style.viewTransitionName = `letter-${letter}-0`;
      button.innerText = letter.toUpperCase();
      button.addEventListener("click", () => {
        chooseLetter(letter);
      });

      buttons.push(button);

      if (occurrences > 1) {
        Array(occurrences - 1)
          .fill(null)
          .forEach((n, i) => {
            const buttonClone = button.cloneNode(true);
            buttonClone.style.viewTransitionName = `letter-${letter}-${i + 1}`;
            buttonClone.classList.add("clone");
            buttons.push(buttonClone);
          });
      }

      letterWrapper.append(...buttons);

      lettersEl.appendChild(letterWrapper);
    });

    // Create an empty array with the length of WORD_LENGTH and loop through it to populate the guess DOM in the main page and also in the final modal
    Array(WORD_LENGTH)
      .fill(null)
      .forEach((s, i) => {
        const slot = document.createElement("div");
        const modalSlot = document.createElement("div");
        const modalSlotItem = document.createElement("div");

        modalSlotItem.innerText = answer[i].toUpperCase();
        modalSlotItem.classList.add("letter", `letter-${answer[i]}`);
        slot.className = "slot";
        modalSlot.className = "slot";
        modalSlot.appendChild(modalSlotItem);
        guessEl.appendChild(slot);
        modalGuessEl.appendChild(modalSlot);
      });
  }

  // Display the modal and populate the title based on the result.
  function displayModal(result) {
    modalTitle.innerText = result === "win" ? "Good Job!" : "Game Over!";
    modal.classList.remove("hide");
  }

  // Populates the DOM of the lives part, based on the lives variable, called every time we update the lives variable.
  function populateLives() {
    const heartsEl = document.querySelector(".header .info .lives .hearts");
    const livesTextEl = document.querySelector(
      ".header .info .lives .lives-count"
    );
    livesTextEl.innerText = lives;
    heartsEl.innerHTML = "";
    Array(lives)
      .fill(null)
      .forEach((h, i) => {
        const heart = document.createElement("img");
        heart.src = "./assets/heart-balloon-svgrepo-com.svg";
        heart.alt = "";
        heart.style.viewTransitionName = `life-${i}`;
        heartsEl.appendChild(heart);
      });
  }

  // Handle buying a new life
  buyButton.addEventListener("click", buyLife);
  function buyLife() {
    if (points < LIFE_PRICE) return;
    coinsAudio.play();
    coinsTextEl.style.viewTransitionName = "coins";
    points -= LIFE_PRICE;
    lives += 1;

    // Make sure to update the DOM after updating lives and points
    const transition = document.startViewTransition(() => {
      updateDOM();
    });

    transition.finished.then(() => {
      coinsTextEl.style.viewTransitionName = "none";
    });
  }

  // Populates the DOM of the coins part, based on the points variable, called every time we update the points variable.
  function populateCoins() {
    coinsTextEl.innerText = points;
    // Make sure to disable the button if we don't have enough points
    if (points >= LIFE_PRICE) {
      buyButton.removeAttribute("disabled");
    } else {
      buyButton.setAttribute("disabled", true);
    }
  }

  // Populate the guess slots based on the chosen letter and the correct indexes.
  function populateGuess(letter, indexes) {
    const slots = document.querySelector(".guess.main").children;
    indexes.forEach((pos, index) => {
      const slotItem = document.createElement("div");
      slotItem.innerText = letter.toUpperCase();
      slotItem.classList.add("letter", `letter-${letter}`);
      slotItem.style.viewTransitionName = `letter-${letter}-${index}`;
      slots[pos].appendChild(slotItem);
    });
  }

  // Starts a new game by getting a new word and re-initializing the DOM
  async function newGame() {
    try {
      // Get a new word from the API
      // const res = await fetch(
      //   `https://random-word-api.herokuapp.com/word?length=${WORD_LENGTH}&number=1`
      // ).then((r) => r.json());
      // console.log(res[0]);
      // Clear any answer, lives, points, guess and chosenLetters from previous games
      answer = "spoon".split("");
      lives = MAX_LIVES;
      points = 100;
      guess = Array(WORD_LENGTH).fill(""); // ["","","","",""]
      chosenLetters = [];

      // Re-initialize the DOM to clear any old state
      initDOM();
    } catch (e) {
      console.log(e);
    }
  }

  newGame(); // Start a new game on load

  // Start a new game when clicking on the new game button in the modal
  newGameButton.addEventListener("click", async () => {
    // make sure to disable the new game button while we send the new word request to avoid sending multiple requests. You can also display a loading spinner.
    newGameButton.setAttribute("disabled", true);
    await newGame();
    newGameButton.removeAttribute("disabled");
  });
});
