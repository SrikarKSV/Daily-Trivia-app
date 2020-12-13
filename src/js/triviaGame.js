import {
  gameContainer,
  countDownContainer,
  questionEl,
  labelChoicesEls,
  inputChoicesEls,
  nextBtn,
} from "./lib/elements";
import { startCountdown, updateProgressBar } from "./lib/utils";

nextBtn.addEventListener("click", checkAnswer);

let index = 0;
let triviaQuestions;
let score = 0;

export function trviaStart(results) {
  countDownContainer.dispatchEvent(new CustomEvent("startCountdown"));
  setTimeout(() => {
    loadQuestions(results);
  }, 3100);
}

function loadQuestions(results) {
  // Setting score to 0 if game restarted
  score = 0;
  index = 0;

  triviaQuestions = results;
  gameContainer.classList.add("expand");
  const { question, mcqs } = triviaQuestions[index % 5];
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
    // Incrementing index to go to next question
    index++;
    loadNextQuestion(chosenIndex);
  }
}

function loadNextQuestion(chosenIndex) {
  if (index % 5 === 0) {
    // Showing the WIN screen
    gameContainer.innerHTML = `<h1>You won!!</h1><p>Your score: ${score}</p>`;
    console.log("YES");
  }
  const { correctAnswer } = triviaQuestions[index % 5];
  if (correctAnswer === chosenIndex) {
    score++;
  }
  nextQuestion(chosenIndex, index);
}

function nextQuestion(chosenIndex, index) {
  const { question, mcqs } = triviaQuestions[index % 5];
  questionEl.innerHTML = question;
  labelChoicesEls.forEach((choicesEl, index) => {
    choicesEl.innerHTML = mcqs[index];
  });
  inputChoicesEls[chosenIndex].checked = false;

  // Update progress bar
  updateProgressBar(index);
}

countDownContainer.addEventListener("startCountdown", startCountdown);
