import {
  gameContainer,
  countDownContainer,
  questionEl,
  labelChoicesEls,
  inputChoicesEls,
  nextBtn,
  gameWinContainer,
} from "./lib/elements";
import { startCountdown, updateProgressBar } from "./lib/utils";
import { winScreen } from "./triviaWon";

nextBtn.addEventListener("click", checkAnswer);

let index = 0;
let triviaQuestions;
let score = 0;
let mcqChosenIndex = [];

export function trviaStart(results) {
  countDownContainer.dispatchEvent(new CustomEvent("startCountdown"));
  setTimeout(() => {
    loadQuestions(results);
  }, 3100);
}

function loadQuestions(results) {
  // Resetting everything when game is restarted
  score = 0;
  index = 0;
  mcqChosenIndex = [];

  triviaQuestions = results;
  gameContainer.classList.add("expand");
  const { question, mcqs } = triviaQuestions[index];
  questionEl.innerHTML = question;
  labelChoicesEls.forEach((choicesEl, index) => {
    choicesEl.innerHTML = mcqs[index];
  });
}

function checkAnswer(e) {
  e.preventDefault();
  const chosenIndex = Array.from(inputChoicesEls).findIndex(
    (inputChoicesEl) => inputChoicesEl.checked
  );
  if (chosenIndex === -1) {
    console.log("CHOOSE SOMETHING!!");
  } else {
    // Pushing the player chosen mcq
    mcqChosenIndex.push(chosenIndex);
    loadNextQuestion(chosenIndex);
  }
}

function loadNextQuestion(chosenIndex) {
  const { correctAnswer } = triviaQuestions[index];
  if (correctAnswer === chosenIndex) {
    score++;
  }
  // Incrementing index to go to next question
  index++;
  // Showing the WIN screen if it's the last question
  if (index === 5) {
    winScreen(mcqChosenIndex, triviaQuestions, score);
    gameWinContainer.classList.add("active");
    return;
  }
  nextQuestion(chosenIndex, index);
}

function nextQuestion(chosenIndex, index) {
  const { question, mcqs } = triviaQuestions[index];

  // Adding fade-out to replace content
  questionEl.classList.add("fade-out");
  labelChoicesEls.forEach((choicesEl) => {
    choicesEl.classList.add("fade-out");
  });

  questionEl.addEventListener(
    "transitionend",
    () => {
      questionEl.innerHTML = question;
      labelChoicesEls.forEach((choicesEl, index) => {
        choicesEl.innerHTML = mcqs[index];
      });
      inputChoicesEls[chosenIndex].checked = false;

      // Removing fade-out after content is replaced
      questionEl.classList.remove("fade-out");
      labelChoicesEls.forEach((choicesEl) => {
        choicesEl.classList.remove("fade-out");
      });
    },
    { once: true }
  );

  // Update progress bar
  updateProgressBar(index);
}

countDownContainer.addEventListener("startCountdown", startCountdown);
