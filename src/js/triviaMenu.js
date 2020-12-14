import getQuestions from "./lib/fetchQuestions";
import { restartGame } from "./lib/utils";
import { gameContainer, loadingAnimation } from "./lib/elements";
import { trviaStart } from "./triviaGame";

let results;

export async function handleMenuSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  loadingAnimation.classList.add("active");
  results = await getQuestions(form.category.value, form.difficulty.value);
  loadingAnimation.classList.remove("active");
  restartGame();
  gameContainer.dispatchEvent(new CustomEvent("gameStarted"));
}

gameContainer.addEventListener("gameStarted", () => trviaStart(results));
