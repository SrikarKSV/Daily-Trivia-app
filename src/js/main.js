import { renderCategories, restartGame } from "./lib/utils";
import { handleMenuSubmit } from "./triviaMenu";

const gameMenuForm = document.querySelector(".setup__form");
const restartBtn = document.querySelector(".restart-btn");

gameMenuForm.addEventListener("submit", handleMenuSubmit);
restartBtn.addEventListener("click", restartGame);

renderCategories();
