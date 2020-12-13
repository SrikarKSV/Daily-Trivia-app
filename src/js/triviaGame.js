import { gameContainer, countDownContainer } from "./lib/elements";
import { startCountdown } from "./lib/utils";

export function trviaStart(results) {
  countDownContainer.dispatchEvent(new CustomEvent("startCountdown"));
  setTimeout(() => {
    loadQuestions(results);
  }, 3100);
}

function loadQuestions(results) {
  gameContainer.classList.add("expand");
}

countDownContainer.addEventListener("startCountdown", startCountdown);
