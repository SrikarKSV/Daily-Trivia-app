import getQuestions from "./lib/fetchQuestions";
import { restartGame } from "./lib/utils";
import { gameContainer } from "./lib/elements";
import { trviaStart } from "./triviaGame";

let results;

export async function handleMenuSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  results = await getQuestions(form.category.value, form.difficulty.value);
  restartGame();
  gameContainer.dispatchEvent(new CustomEvent("gameStarted"));
}

gameContainer.addEventListener("gameStarted", () => trviaStart(results));
